import React, { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import Loading from "../components/Loading"
import Layout from "../layout"

const Intro = lazy(() => import("../page/intro"))
const Auth = lazy(() => import("../page/auth"))
const Login = lazy(() => import("../page/auth/login"))
const Register = lazy(() => import("../page/auth/register"))
const Info = lazy(() => import("../page/auth/register/info"))

const Routine = lazy(() => import("../page/routine"))
const Record = lazy(() => import("../page/record"))
const Walk = lazy(() => import("../page/walk"))
const Community = lazy(() => import("../page/community"))
const MyPage = lazy(() => import("../page/mypage"))

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
            <Routine />
          </Suspense>
        ),
      },
      {
        path: "record",
        element: (
          <Suspense fallback={<Loading />}>
            <Record />
          </Suspense>
        ),
      },
      {
        path: "walk",
        element: (
          <Suspense fallback={<Loading />}>
            <Walk />
          </Suspense>
        ),
      },
      {
        path: "community",
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
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
      },
    ],
  },
])

export default router
