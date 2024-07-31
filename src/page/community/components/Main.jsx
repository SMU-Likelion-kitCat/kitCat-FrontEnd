import React, { useState, useEffect } from "react";
import { ReactComponent as CommunityAddIcon } from "../../../assets/community/CommunityAddIcon.svg";
import { ReactComponent as Comment } from "../../../assets/community/Comment.svg";
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg";
import { ReactComponent as NewButton } from "../../../assets/community/NewButton.svg";
import { ReactComponent as FillHeart } from "../../../assets/community/FillHeart.svg";
import { useNavigate } from "react-router-dom";
import { postShowAll } from "../../../api";
import New from "../components/New";

const Main = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [commentCount, setCommentCount] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [createTime, setCreateTime] = useState("");
  const [posts, setPosts] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const listData = {
        content: content,
        writer: writer,
        commentCount: commentCount,
        likeCount: likeCount,
        createTime: createTime,
      };
      try {
        const res = await postShowAll(listData);
        console.log("포스트 목록:", res);
        setPosts(res || []);

        // const initialLikes = data.reduce((likes, post) => {
        //   likes[post.postId] = {
        //     isLiked: false,
        //     likeCount: post.likeCount,
        //   };
        //   return likes;
        // }, {});
        // setPostLikes(initialLikes);
      } catch (error) {
        console.error("게시글을 가져오는데 실패했습니다.", error);
      }
    };

    fetchPosts();
  }, [commentCount, content, createTime, likeCount, writer]);

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
  const handlePostSubmit = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowNew(false);
  };

  return (
    <div className="community-content-container">
      {showNew ? (
        <New onPostSubmit={handlePostSubmit} />
      ) : (
        <>
          <div className="community-content-title-wrapper">
            <h1 className="community-content-title">커뮤니티</h1>
            <CommunityAddIcon />
          </div>
          {posts.map((post, index) => (
            <div
              key={index}
              className="community-content-list-wrapper"
              onClick={() => navigate(`/community/postId/${post.postId}`)}
            >
              <div className="community-content-list">
                <div className="community-content-state">
                  <div className="community-content-list-response">
                    <div className="community-content-user-info">
                      <div
                        className="community-content-user-name"
                        key={post.writer}
                      >
                        {post.writer}
                      </div>
                      <div className="community-content-dot">·</div>
                      <div className="community-content-user-time">
                        {new Date(post.createTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="community-content-list-title">
                  {post.content}
                </div>
                <div className="community-content-response-count">
                  <div className="community-content-comment-icon-wrapper">
                    <div className="community-content-comment-icon">
                      <Comment />
                    </div>
                    <div
                      className="community-content-comment-count"
                      key={post.commentCount}
                    >
                      {post.commentCount}
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
          <button
            className="community-new-button"
            onClick={() => setShowNew(true)}
          >
            <div className="community-new-button-wrapper">
              <NewButton />
              <div className="community-new-button-text">글쓰기</div>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default Main;
