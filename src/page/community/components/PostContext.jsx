import React, { useState } from "react";
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg";
import { ReactComponent as Comment } from "../../../assets/community/Comment.svg";
import { useParams } from "react-router-dom";
import { ReactComponent as FillHeart } from "../../../assets/community/FillHeart.svg";
import Dum from "./Dum";

//게시글
const PostContext = () => {
  const { postId } = useParams();

  const [postLikes, setPostLikes] = useState(
    Dum.reduce((acc, post) => {
      acc[post.postId] = {
        isLiked: false,
        likeCount: post.response,
      };
      return acc;
    }, {})
  );
  const handleLikeClick = (postId, e) => {
    e.stopPropagation();
    setPostLikes((prevPostLikes) => {
      const post = prevPostLikes[postId];
      return {
        ...prevPostLikes,
        [postId]: {
          isLiked: !post.isLiked,
          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
        },
      };
    });
  };
  const post = Dum.find((p) => p.postId === parseInt(postId, 10));

  return (
    <div className="community-content-list">
      <div className="community-content-state">
        <div className="community-content-list-response">
          <div className="community-content-user-info">
            <div className="community-content-user-name">{post.author}</div>
            <div className="community-content-dot">·</div>
            <div className="community-content-user-time">
              {post.elapsedTime}
            </div>
          </div>
        </div>
      </div>
      <div className="community-content-list-title">{post.content}</div>
      <div className="community-content-list-picture">
        {/* <img src={post.picture} alt="Post content" /> */}
      </div>

      <div className="community-content-response-count">
        <div className="community-content-heart-icon-wrapper">
          <div
            className="community-content-heart-icon"
            onClick={(e) => handleLikeClick(post.postId, e)}
          >
            {postLikes[post.postId]?.isLiked ? <FillHeart /> : <Heart />}
          </div>

          <div className="community-content-heart-count">
            {postLikes[post.postId]?.likeCount || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContext;
