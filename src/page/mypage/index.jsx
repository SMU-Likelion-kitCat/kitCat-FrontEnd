// // import React, { useEffect } from "react";
// // import { Outlet, useNavigate } from "react-router-dom";

// // const MyPage = () => {
// //   const navigate = useNavigate();
// //   useEffect(() => {
// //     navigate("/mypage/intro");
// //   }, []);

// //   return <Outlet />;
// // };

// // export default MyPage;

// import React, { useEffect } from "react"
// import { Outlet, useNavigate } from "react-router-dom"
// import BackButton from "../auth/register/components/BackButton"

// const MyPage = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     navigate("/mypage/intro")
//   }, [navigate])

//   return (
//     <div>
//       <BackButton onClick={() => navigate(-1)} />
//       <Outlet />
//     </div>
//   )
// }

// export default MyPage
