import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout";

const Intro = lazy(() => import("../page/intro"));
const Auth = lazy(() => import("../page/auth"));

const Login = lazy(() => import("../page/auth/login"));
const Register = lazy(() => import("../page/auth/register"));

const MyPage = lazy(() => import("../page/mypage"));
const MyBody = lazy(() => import("../page/mypage/components/BodyInfo"));
const MyPet = lazy(() => import("../page/mypage/components/PetInfo"));
const MyPageIntro = lazy(() => import("../page/mypage/components/MyPageIntro"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Intro />
          </Suspense>
        ),
      },
      {
        path: "mypage",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        ),
        children: [
          {
            path: "intro",
            element: (
              <Suspense fallback={<Loading />}>
                <MyPageIntro />
              </Suspense>
            ),
          },
          {
            path: "info",
            element: (
              <Suspense fallback={<Loading />}>
                <MyBody />
              </Suspense>
            ),
          },
          {
            path: "pet",
            element: (
              <Suspense fallback={<Loading />}>
                <MyPet />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "auth",
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
        children: [
          {
            path: "login",
            element: (
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
