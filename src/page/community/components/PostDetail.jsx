// import React, { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { postShow } from "../../../api"
// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
// import Post from "./Post"
// import { useSelector } from "react-redux"

// import Comments from "./Comments"
// import { useFooterVisibility } from "../../../layout/index"

// const PostDetail = () => {
//   const navigate = useNavigate()
//   const { postId } = useParams()
//   const [post, setPost] = useState(null)
//   const auth = useSelector((state) => state.auth)
//   const author = auth.nickname

//   const { setShowFooter } = useFooterVisibility()

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await postShow(postId)
//         console.log("Fetched post data:", res)
//         setPost(res)
//       } catch (error) {
//         console.error("Failed to fetch the post.", error)
//       }
//     }
//     setShowFooter(false)
//     console.log("현재 게시물 아이디 :", postId)
//     console.log("로그인한 계정 이름 :", author)
//     fetchPost()
//     return () => setShowFooter(true)
//   }, [postId])

//   if (!post) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="community-content-container">
//       <div className="community-content-head-wrapper">
//         <BackArrow className="" onClick={() => navigate(-1)} />
//       </div>
//       <div className="comunity-content-list-wrapper">
//         <Post
//           className="community-content-list-wrapper"
//           postId={postId}
//           writer={post.writer}
//           createTime={post.createTime}
//           content={post.content}
//           photoNames={post.photoNames || []}
//           likeCount={post.likeCount}
//           commentCount={post.commentCount}
//           heartState={post.heartState}
//           showComments={false} // Add this prop if necessary
//         />
//         <div className="line-detail" />
//       </div>
//       <Comments
//         commentsData={post.comments || []}
//         postId={postId}
//         author={author}
//       />
//     </div>
//   )
// }

// export default PostDetail

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postShow } from "../../../api"
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import Post from "./Post"
import Comments from "./Comments"
import { useSelector } from "react-redux"
import { useFooterVisibility } from "../../../layout/index"
import Loading from "../../../assets/walk/Loading.gif"

const PostDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const auth = useSelector((state) => state.auth)
  const author = auth.nickname
  const { setShowFooter } = useFooterVisibility()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postShow(postId)
        setPost(res)
      } catch (error) {
        console.error("Failed to fetch the post.", error)
      }
    }
    setShowFooter(false)
    fetchPost()
    return () => setShowFooter(true)
  }, [postId, setShowFooter])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="community-content-container">
      <div className="community-content-head-wrapper">
        <BackArrow onClick={() => navigate(-1)} />
      </div>
      <div className="comunity-content-list-wrapper">
        <Post
          className="community-content-list-wrapper"
          postId={postId}
          writer={post.writer}
          createTime={post.createTime}
          content={post.content}
          files={post.photoNames || []}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          heartState={post.heartState}
          showComments={false}
        />
        <div className="line-detail" />
      </div>
      <Comments
        commentsData={post.comments || []}
        postId={postId}
        author={author}
      />
    </div>
  )
}

export default PostDetail
