import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Main from "./components/Main";
import Dum from "./components/Dum";

const Community = () => {
  const location = useLocation();
  const isCommunityPath = location.pathname === "/community";
  return (
    <>
      {isCommunityPath && <Main />}
      <Outlet />
    </>
  );
};

export default Community;
