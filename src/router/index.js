import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout";
import recommendRouter from "./recommendRouter";
import LoginCheck from "../components/LoginCheck";

const Intro = lazy(() => import("../page/intro"));
const Auth = lazy(() => import("../page/auth"));
const Login = lazy(() => import("../page/auth/login"));
const Register = lazy(() => import("../page/auth/register"));
const Info = lazy(() => import("../page/auth/register/info"));

const Routine = lazy(() => import("../page/routine"));

const Record = lazy(() => import("../page/record"));
const Walk = lazy(() => import("../page/walk"));
const Community = lazy(() => import("../page/community"));
const PostDetail = lazy(() =>
  import("../page/community/components/PostDetail")
);
const PostCreate = lazy(() =>
  import("../page/community/components/PostCreate")
);

const MyPage = lazy(() => import("../page/mypage"));
const Result = lazy(() => import("../page/walk/result"));
const Chatbot = lazy(() => import("../page/chatbot"));
const MyPageEdit = lazy(() => import("../page/mypage/components/ProfileEdit"));
const MyPetEdit = lazy(() => import("../page/mypage/components/PetEdit"));

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
            children: [
              {
                path: "info",
                element: (
                  <Suspense fallback={<Loading />}>
                    <Info />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "routine",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<Routine />} />
          </Suspense>
        ),
        children: recommendRouter.map((route) => ({
          ...route,
          element: (
            <Suspense fallback={<Loading />}>
              <LoginCheck element={route.element} />
            </Suspense>
          ),
        })),
      },
      {
        path: "record",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<Record />} />
          </Suspense>
        ),
      },
      {
        path: "walk",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<Walk />} />
            {/* <Walk /> */}
          </Suspense>
        ),
        children: [
          {
            path: "result",
            element: (
              <Suspense fallback={<Loading />}>
                <LoginCheck element={<Result />} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "community",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<Community />} />
          </Suspense>
        ),
        children: [
          {
            path: "create",
            element: (
              <Suspense fallback={<Loading />}>
                <PostCreate element={<Result />} />
              </Suspense>
            ),
          },
          {
            path: "post/:postId",
            element: (
              <Suspense fallback={<Loading />}>
                <PostDetail element={<Result />} />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "chatbot",
        element: (
          <Suspense fallback={<Loading />}>
            <Chatbot />
          </Suspense>
        ),
      },
      {
        path: "mypage",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<MyPage />} />
          </Suspense>
        ),
        children: [
          {
            path: "edit",
            element: (
              <Suspense fallback={<Loading />}>
                <LoginCheck element={<MyPageEdit />} />
              </Suspense>
            ),
          },
          {
            path: "pet",
            element: (
              <Suspense fallback={<Loading />}>
                <LoginCheck element={<MyPetEdit />} />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
