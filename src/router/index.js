import React, { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import Loading from "../components/Loading"
import Layout from "../layout"

const Main = lazy(() => import("../page/main"))
const Intro = lazy(() => import("../page/intro"))
const Auth = lazy(() => import("../page/auth"))
const Login = lazy(() => import("../page/auth/login"))
const Register = lazy(() => import("../page/auth/register"))

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
          },
        ],
      },
    ],
  },
])

export default router
