import React from "react";
import { ReactComponent as CommunityAddIcon } from "../../../assets/community/CommunityAddIcon.svg";
import { ReactComponent as Comment } from "../../../assets/community/Comment.svg";
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg";
import { ReactComponent as NewButton } from "../../../assets/community/NewButton.svg";
import Dum from "../../community/components/Dum";
import { useNavigate } from "react-router-dom";
const Main = (post) => {
  const navigate = useNavigate();
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
            onClick={() => navigate(`/community/${post.postId}`)}
          >
            <hr className="over-hr" />
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
                  <div className="community-content-comment-count">5</div>
                </div>
                <div className="community-content-heart-icon-wrapper">
                  <div className="community-content-heart-icon">
                    <Heart />
                  </div>
                  <div className="community-content-heart-count">
                    {post.response}
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
