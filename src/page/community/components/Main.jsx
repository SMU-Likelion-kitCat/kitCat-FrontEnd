import React, { useState } from "react";
import { ReactComponent as CommunityAddIcon } from "../../../assets/community/CommunityAddIcon.svg";
import { ReactComponent as Comment } from "../../../assets/community/Comment.svg";
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg";
import { ReactComponent as NewButton } from "../../../assets/community/NewButton.svg";
import { ReactComponent as FillHeart } from "../../../assets/community/FillHeart.svg";
import Dum from "../../community/components/Dum";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const [postLikes, setPostLikes] = useState(
    Dum.reduce((likes, post) => {
      likes[post.postId] = {
        isLiked: false,
        likeCount: post.response,
      };
      return likes;
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

  return (
    <>
      <div className="community-content-container">
        <div className="community-content-title-wrapper">
          <h1 className="community-content-title">커뮤니티</h1>
          <CommunityAddIcon />
        </div>
        {Dum.map((post) => (
          <div
            key={post.postId}
            className="community-content-list-wrapper"
            onClick={() => navigate(`/community/postId/${post.postId}`)}
          >
            <div className="community-content-list">
              <div className="community-content-state">
                <div className="community-content-list-response">
                  <div className="community-content-user-info">
                    <div className="community-content-user-name">
                      {post.author}
                    </div>
                    <div className="community-content-dot">·</div>
                    <div className="community-content-user-time">
                      {post.elapsedTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="community-content-list-title">{post.content}</div>
              <div className="community-content-response-count">
                <div className="community-content-comment-icon-wrapper">
                  <div className="community-content-comment-icon">
                    <Comment />
                  </div>
                  <div className="community-content-comment-count">
                    {post.comments ? post.comments.length : 0}
                  </div>
                </div>
                <div
                  className="community-content-heart-icon-wrapper"
                  onClick={(e) => handleLikeClick(post.postId, e)}
                >
                  <div className="community-content-heart-icon">
                    {postLikes[post.postId]?.isLiked ? (
                      <FillHeart />
                    ) : (
                      <Heart />
                    )}
                  </div>

                  <div className="community-content-heart-count">
                    {postLikes[post.postId]?.likeCount || 0}
                  </div>
                </div>
              </div>
              <hr className="under-hr" />
            </div>
          </div>
        ))}
        <button className="community-new-button">
          <div className="community-new-button-wrapper">
            <NewButton />
            <div
              className="community-new-button-text"
              onClick={() => navigate("/community/new")}
            >
              글쓰기
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Main;
