import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageMain from "./components/MypageMain";

const MyPage = () => {
  const location = useLocation();
  const isMyPagePath = location.pathname === "/mypage";
  return (
    <>
      {isMyPagePath && <MyPageMain />}
      <Outlet />
    </>
  );
};

export default MyPage;
