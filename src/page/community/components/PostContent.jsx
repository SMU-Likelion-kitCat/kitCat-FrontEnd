import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";

import Comments from "./Comments";
import PostContext from "./PostContext";

const PostContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="community-content-container">
        <div className="community-content-title-wrapper">
          <BackArrow
            onClick={() => navigate(-1)}
            className="community-back-button"
          />
        </div>
        <div className="community-content-list-wrapper">
          <PostContext />
          <hr />
        </div>
      </div>

      <Comments />
    </>
  );
};

export default PostContent;
