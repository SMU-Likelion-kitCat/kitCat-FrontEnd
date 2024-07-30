// import React, { useState } from "react";
// import Dum from "./Dum";
// import { ReactComponent as Reply } from "../../../assets/community/Reply.svg";
// import { useParams } from "react-router-dom";

// const Comments = () => {
//  const { postId } = useParams();
//   const [hasReply, setHasReply] = useState(false);
//   const [replyInput, setReplyInput] = useState("");

//   const comment = Dum.find();

//   const handleReplyClick = () => {
//     setHasReply(true);
//   };
//   const handleReplyChange = (e) => {
//     setReplyInput(e.target.value);
//   };
//   const handleReplySubmit = () => {
//     setHasReply(false);
//     setReplyInput("");
//   };
//   return (
//     <div className="community-comments-container">
//       <div className="community-comments-wrapper">
//         <p>
//           {comment.author} · {comment.elapsedTime}
//         </p>
//         <Reply onClick={handleReplyClick} />
//         {hasReply && (
//           <input
//             type="text"
//             onChange={handleReplyChange}
//             placeholder="댓글을 입력하세요."
//           />
//         )}
//         <p className="community-comments-content">{comment.content}</p>
//       </div>
//       <div className="community-replay-wrapper">
//         <p>
//           {comment.user} · {comment.elapsedTime}
//         </p>
//         <Reply onClick={handleReplySubmit} />
//       </div>
//       <p className="community-comments-content">오오</p>
//     </div>
//   );
// };
// export default Comments;
import React, { useState, useRef } from "react";
import { ReactComponent as Reply } from "../../../assets/community/Reply.svg";
import { ReactComponent as CommentSubmit } from "../../../assets/community/CommentSubmit.svg";
import { useParams } from "react-router-dom";
import Dum from "./Dum";

const Comments = () => {
  const { postId } = useParams();
  const [replyInput, setReplyInput] = useState("");
  const inputRef = useRef(null);
  const [replyFocus, setReplyFocus] = useState(false);
  const [replyAdd, setReplyAdd] = useState();
  const [commentAdd, setCommentAdd] = useState([]);
  const post = Dum.find((p) => p.postId === parseInt(postId, 10));

  const totalComments =
    (post.comment ? post.comment.length : 0) + commentAdd.length;
  const handleReplyClick = () => {
    setReplyFocus(true);
    inputRef.current.focus();
  };
  const handleReplyChange = (e) => {
    setReplyInput(e.target.value);
  };

  const handleReplyAdd = () => {
    if (replyInput.trim()) {
      setCommentAdd((prev) => [
        ...prev,
        { author: "현재 사용자", elapsedTime: "방금", content: replyInput },
      ]);
      setReplyInput("");
    }
  };

  return (
    <>
      <div className="community-comments-container">
        <p className="community-comments-header">
          <Reply />
          댓글 {totalComments}
        </p>

        {[...(post.comment || []), ...commentAdd].map((comment, index) => (
          <div key={index} className="community-comments-wrapper">
            <div className="community-comments-info">
              <p>
                <span>{comment.author}</span>
                <span>·</span>
                <span>{comment.elapsedTime}</span>
              </p>
              <Reply onClick={handleReplyClick} />
            </div>
            <p className="community-comments-content">{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="community-comments-input-container-border">
        <div className="community-comments-input-container">
          <input
            className="community-comments-input"
            type="text"
            value={replyInput}
            ref={inputRef}
            placeholder="댓글을 입력하세요"
            onChange={handleReplyChange}
          />
          <CommentSubmit
            onClick={handleReplyAdd}
            style={{ marginRight: "7px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Comments;
