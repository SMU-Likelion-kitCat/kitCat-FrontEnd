import React, { useState, useRef } from "react";
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddPicture } from "../../../assets/community/AddPicture.svg";
import { ReactComponent as AddPicturePlus } from "../../../assets/community/AddPicturePlus.svg";
// import { ReactComponent as Delete } from "../../../assets/community/Delete.svg";
const New = () => {
  const navigate = useNavigate();
  const handlePostSubmit = () => {};

  return (
    <div className="community-new-container">
      <div className="community-new-header">
        <BackArrow
          onClick={() => navigate(-1)}
          className="community-back-button"
        />
        <button
          onClick={handlePostSubmit}
          className="community-new-edit-button"
        >
          확인
        </button>
      </div>

      <input
        type="text"
        placeholder="글 제목을 입력하세요."
        className="community-new-title-input"
      ></input>
      <hr className="title-hr" />
      <input
        type="text"
        className="community-new-content-input"
        placeholder="내용을 입력하세요"
      ></input>
      <div>
        <form>
          <div className="community-new-add-picture">
            <div className="community-new-add-picture-icon-wrapper">
              <AddPicturePlus className="community-new-add-picture-plus-icon" />
              <AddPicture className="community-new-add-picture-icon" />
            </div>

            <input
              type="file"
              name="file "
              accept="image/jpg, image/jpeg, image/png"
              multiple
              style={{ display: "none" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
