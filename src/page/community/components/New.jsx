// import React, { useState, useRef } from "react";
// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
// import { useNavigate } from "react-router-dom";
// import { ReactComponent as AddPicture } from "../../../assets/community/AddPicture.svg";
// import { ReactComponent as AddPicturePlus } from "../../../assets/community/AddPicturePlus.svg";
// // import { ReactComponent as Delete } from "../../../assets/community/Delete.svg";
// import { postCreate } from "../../../api";

// const New = ({ onPostSubmit }) => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState([]);
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const handleFileChange = (e) => {
//     setImage(e.target.files ? Array.from(e.target.files) : []);
//   };

//   const handlePostSubmit = async () => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (image && image.length > 0) {
//       image.forEach((file) => {
//         formData.append("files", file);
//       });
//     }

//     // if (image) formData.append("files", image);
//     try {
//       const res = await postCreate(formData);

//       const newPost = await res.json();
//       console.log("새 게시물:", newPost);
//       setPosts((prevPosts) => [newPost, ...prevPosts]);
//       onPostSubmit(newPost);
//       navigate("/community");

//       console.log("게시물 작성 실패", res.statusText);
//     } catch (error) {
//       console.error("게시글을 가져오는데 실패했습니다.", error);
//     }
//   };

//   return (
//     <div className="community-new-container">
//       <div className="community-new-header">
//         <BackArrow
//           onClick={() => navigate(-1)}
//           className="community-back-button"
//         />
//         <button
//           onClick={handlePostSubmit}
//           className="community-new-edit-button"
//         >
//           확인
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="글 제목을 입력하세요."
//         className="community-new-title-input"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <hr className="title-hr" />
//       <input
//         type="text"
//         className="community-new-content-input"
//         placeholder="내용을 입력하세요"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <div>
//         <form>
//           <div className="community-new-add-picture">
//             <div className="community-new-add-picture-icon-wrapper">
//               <AddPicturePlus className="community-new-add-picture-plus-icon" />
//               <AddPicture className="community-new-add-picture-icon" />
//             </div>

//             <input
//               type="file"
//               accept="image/jpg, image/jpeg, image/png"
//               multiple
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default New;
import React, { useState } from "react";
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddPicture } from "../../../assets/community/AddPicture.svg";
import { ReactComponent as AddPicturePlus } from "../../../assets/community/AddPicturePlus.svg";
import { postCreate } from "../../../api";

const New = ({ onPostSubmit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files ? Array.from(e.target.files) : []);
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image && image.length > 0) {
      image.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const newPost = await postCreate(formData); // 이미 JSON 데이터가 반환되므로 await res.json() 호출 필요 없음
      console.log("새 게시물:", newPost);
      onPostSubmit(newPost); // 상위 컴포넌트로 새 게시물 전달
      navigate("/community");
    } catch (error) {
      console.error("게시글 작성에 실패했습니다.", error);
    }
  };

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <hr className="title-hr" />
      <input
        type="text"
        className="community-new-content-input"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="community-new-add-picture">
        <div
          className="community-new-add-picture-icon-wrapper"
          onClick={() => document.getElementById("file-upload").click()}
        >
          <AddPicturePlus className="community-new-add-picture-plus-icon" />
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
      </div>
    </div>
  );
};

export default New;
