import React, { useState } from "react";
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddPicture } from "../../../assets/community/AddPicture.svg";
import { postCreate } from "../../../api";

const PostCreate = ({ onPostSubmit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    setImage(
      e.target.files ? [...image, ...Array.from(e.target.files)] : image
    );
  };

  const handlePostSubmit = async () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Images:", image);

    const dto = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], {
        type: "application/json",
      })
    );
    if (image && image.length > 0) {
      image.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const newPost = await postCreate(formData);
      console.log("새 게시물:", newPost);
      onPostSubmit(newPost);
      navigate("/community");
    } catch (error) {
      navigate("/community");
    }
  };

  return (
    <div className="community-content-container">
      <div className="community-content-head-wrapper">
        <BackArrow onClick={() => navigate(-1)} />
        <button
          onClick={handlePostSubmit}
          className="community-new-edit-button"
        >
          확인
        </button>
      </div>

      <form>
        <textarea
          type="text"
          className="community-new-content-input"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <div className="community-new-add-picture">
        <div
          className="community-new-add-picture-icon-wrapper"
          onClick={() => document.getElementById("file-upload").click()}
        >
          <AddPicture className="community-new-add-picture-icon" />
        </div>
        <input
          type="file"
          id="file-upload"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="community-new-image-preview-container">
          <div className="community-new-image-preview">
            {image &&
              image.length > 0 &&
              image.map((img, index) => (
                <div key={index} className="community-new-image-thumbnail">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index + 1}`}
                  />
                  <button
                    onClick={() =>
                      setImage(image.filter((_, i) => i !== index))
                    }
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
