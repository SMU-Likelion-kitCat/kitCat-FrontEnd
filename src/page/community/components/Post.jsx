import React, { useState, useEffect } from "react";
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg";
import { ReactComponent as FillHeart } from "../../../assets/community/FillHeart.svg";
import { ReactComponent as Comment } from "../../../assets/community/Comment.svg";
import { inHeart } from "../../../api"; // Adjust import path as needed

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format month, day, hours, and minutes
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedMonth}.${formattedDay} ${formattedHours}:${formattedMinutes}`;
};

const Post = ({
  postId,
  writer,
  createTime,
  content,
  files = [],
  likeCount,
  commentCount,
  showComments = true,
  heartState,
}) => {
  const formattedCreateTime = formatDate(createTime);

  // Set initial state based on heartState prop
  const [isLiked, setIsLiked] = useState(heartState);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleLikeToggle = async () => {
    if (loading) return; // Prevent action if already loading

    if (!isLiked) {
      setLoading(true);
      try {
        await inHeart(postId);
        console.log("Liked", postId); // Debug statement
        setCurrentLikeCount((prevCount) => prevCount + 1);
        setIsLiked(true);
      } catch (error) {
        console.error("Error liking post:", error);
        // Optionally, you can display an error message to the user
      } finally {
        setLoading(false);
      }
    }
  };

  // Sync the `isLiked` state with prop changes if needed
  useEffect(() => {
    setIsLiked(heartState);
  }, [heartState]);

  console.log(heartState);

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-time">
          {writer} · {formattedCreateTime}
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        <div className="post-images">
          {files.map((file, index) => (
            <img key={index} src={file} alt={`Post Image ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="post-footer">
        {showComments && (
          <div className="comment-section">
            <Comment className="post-comment-icon" />
            <div className="post-comments">{commentCount}</div>
          </div>
        )}
        <div className="like-section" onClick={handleLikeToggle}>
          {loading ? (
            <div>Loading...</div> // Optionally show a loading indicator
          ) : isLiked ? (
            <FillHeart className="post-like-icon" />
          ) : (
            <Heart className="post-like-icon" />
          )}
          <div className="post-likes">{currentLikeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
