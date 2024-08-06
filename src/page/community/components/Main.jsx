// import React, { useState, useEffect } from "react";
// import { ReactComponent as NewButton } from "../../../assets/community/NewButton.svg";
// import { useNavigate } from "react-router-dom";
// import { postShowAll } from "../../../api";
// import Post from "./Post";

// const Main = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [postLikes, setPostLikes] = useState({});

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await postShowAll();
//         console.log("포스트 목록:", res);

//         setPosts(res || []);

//         const initialLikes = res.reduce((likes, post) => {
//           likes[post.postId] = {
//             heartState: false, // Initial heart state
//             likeCount: post.likeCount,
//           };
//           return likes;
//         }, {});
//         setPostLikes(initialLikes);
//       } catch (error) {
//         console.error("게시글을 가져오는데 실패했습니다.", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleHeartStateChange = (postId, newHeartState) => {
//     setPostLikes((prevPostLikes) => ({
//       ...prevPostLikes,
//       [postId]: {
//         ...prevPostLikes[postId],
//         heartState: newHeartState,
//       },
//     }));
//   };

//   const handlePostClick = (postId) => {
//     console.log(postId); // 콘솔에 postId 출력
//     navigate(`/community/post/${postId}`);
//   };

//   return (
//     <div className="community-content-container">
//       <div className="community-content-head-wrapper">
//         <h1 className="community-content-title">커뮤니티</h1>
//         <NewButton onClick={() => navigate("/community/create")} />
//       </div>
//       {posts.map((post) => (
//         <div key={post.postId} onClick={() => handlePostClick(post.postId)}>
//           <Post
//             className="community-content-list-wrapper"
//             postId={post.postId}
//             writer={post.writer}
//             createTime={post.createTime}
//             content={post.content}
//             files={post.photoNames || []}
//             likeCount={postLikes[post.postId].likeCount}
//             commentCount={post.commentCount}
//             heartState={[post.postId].heartState} // Pass heartState to Post
//             onHeartStateChange={handleHeartStateChange} // Callback for heart state change
//           />
//           <hr className="line"/>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Main;

import React, { useState, useEffect } from "react"
import { ReactComponent as NewButton } from "../../../assets/community/NewButton.svg"
import { useNavigate } from "react-router-dom"
import { postShowAll, inHeart } from "../../../api"
import { ReactComponent as Heart } from "../../../assets/community/Heart.svg"
import { ReactComponent as FillHeart } from "../../../assets/community/FillHeart.svg"
import Post from "./Post"

const Main = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [postLikes, setPostLikes] = useState({})

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postShowAll()
        console.log("포스트 목록:", res)

        setPosts(res || [])

        const initialLikes = res.reduce((likes, post) => {
          likes[post.postId] = {
            heartState: false, // Initial heart state
            likeCount: post.likeCount,
          }
          return likes
        }, {})
        setPostLikes(initialLikes)
      } catch (error) {
        console.error("게시글을 가져오는데 실패했습니다.", error)
      }
    }
    fetchPosts()
  }, [])

  const handlePostClick = (postId) => {
    console.log(postId) // 콘솔에 postId 출력
    navigate(`/community/post/${postId}`)
  }

  return (
    <div className="community-content-container">
      <div className="community-content-head-wrapper">
        <h1 className="community-content-title">커뮤니티</h1>
        <NewButton onClick={() => navigate("/community/create")} />
      </div>
      {posts.map((post) => (
        <div key={post.postId} onClick={() => handlePostClick(post.postId)}>
          <Post
            className="community-content-list-wrapper"
            postId={post.postId}
            writer={post.writer}
            createTime={post.createTime}
            content={post.content}
            files={post.photoNames || []}
            likeCount={postLikes[post.postId].likeCount}
            commentCount={post.commentCount}
            heartState={post.heartStatus}
          />
          <hr className="line" />
        </div>
      ))}
    </div>
  )
}

export default Main
