import React, { useState, useEffect } from "react";
import { ReactComponent as CommentSubmit } from "../../../assets/community/CommentSubmit.svg";
import { ReactComponent as GreyChat } from "../../../assets/community/GreyChat.svg";
import { postComment } from "../../../api";
import { useChatbotVisibility, useFooterVisibility } from "../../../layout";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedMonth}.${formattedDay} ${formattedHours}:${formattedMinutes}`;
};

const Comment = ({ author, time, content }) => (
  <div className="comment">
    <div className="comment-header">
      <span className="comment-author">
        {author} · {time}
      </span>
    </div>
    <div className="comment-content">{content}</div>
  </div>
);

const Comments = ({ commentsData, author, postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { setShowChatbot } = useChatbotVisibility();

  useEffect(() => {
    if (commentsData) {
      setComments(
        commentsData.map((comment) => ({
          author: comment.writer,
          time: formatDate(comment.commentTime),
          content: comment.content,
        }))
      );
    }
    setShowChatbot(false);

    return () => setShowChatbot(true);
  }, [commentsData]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const now = new Date().toISOString();
      const commentData = {
        postId,
        content: newComment,
      };
      try {
        await postComment(commentData);
        setComments([
          ...comments,
          { author, time: formatDate(now), content: newComment },
        ]);
        setNewComment("");
      } catch (error) {
        console.error(
          "Failed to post comment:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className="comments-container">
      <div className="comments-list">
        <div className="comments-info">
          <GreyChat />
          <h1 className="comments-info-title">댓글 {comments.length}</h1>
        </div>

        {comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            time={comment.time}
            content={comment.content}
          />
        ))}
      </div>
      <div className="input-footer-wrap">
        <hr className="line-input"></hr>
        <div className="comment-input-section">
          <input
            type="text"
            value={newComment}
            onChange={handleInputChange}
            placeholder="댓글을 입력하세요"
            className="comment-input"
          />

          <CommentSubmit onClick={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
