// import React from "react";
// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
// import Comments from "./Comments";
// const Post = () => {
//   return (
//     <div>
//       <div className="community-post-container">
//         <Comments />
//       </div>
//     </div>
//   );
// };

// export default Post;

// src/components/Post.js
import React from "react";
import Dum from "../../community/components/Dum";
import Comment from "./Comments";

const Post = ({ postId }) => {
  // 더미 데이터에서 해당 postId를 가진 게시물 찾기
  const post = Dum.find((p) => p.postId === postId);

  if (!post) return <div>게시물이 없습니다.</div>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <img src={post.picture} alt={post.title} />
      <p>{post.content}</p>
      <div>{post.response} Responses</div>
      <div>{post.elapsedTime}</div>
      {/* 댓글 컴포넌트에 댓글 데이터 전달 */}
      <Comment comments={post.comments} />
    </div>
  );
};

export default Post;
