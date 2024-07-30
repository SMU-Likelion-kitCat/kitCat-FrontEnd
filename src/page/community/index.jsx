import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// import New from "./components/New";
// import Post from "./components/Post";
import Main from "./components/Main";
const Community = () => {
  const location = useLocation();

  const isCommunityPath = location.pathname === "/community";
  return (
    <div>
      {isCommunityPath && <Main />}
      <Outlet />
    </div>
  );
};

export default Community;
