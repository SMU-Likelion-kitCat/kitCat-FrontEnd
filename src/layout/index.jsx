import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  // footer를 안띄우고 싶은 라우팅을 설정
  const noFooterPaths = [
    "/",
    "/auth",
    "/auth/login",
    "/auth/register",
    "/auth/register/info",
  ];

  // 현재 location이랑 같은지 확인
  const showFooter = !noFooterPaths.some((path) => location.pathname === path);

  return (
    <>
      <div
        className={
          showFooter ? "content-container" : "nofooter-content-container"
        }
      >
        <Outlet />
      </div>
      {showFooter && (
        <footer className="footer-container">{showFooter && <Footer />}</footer>
      )}
    </>
  );
};

export default Layout;
