import React from "react";

// export default Comment;
const Comments = ({ comments }) => {
  <div className="community-comments-container">
    {comments.map((comments) => (
      <div className="community-comments-item" key={comments.id}>
        <div className="community-comments-author">{comments.author}</div>
        <div className="community-comments-content">{comments.content}</div>
        <div className="comment-elapsed-time">{comments.elapsedTime}</div>
      </div>
    ))}
  </div>;
};
export default Comments;
