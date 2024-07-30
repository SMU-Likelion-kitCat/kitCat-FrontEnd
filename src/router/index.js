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
const OngoingRoutineList = lazy(() =>
  import("../page/routine/components/OngoingRoutineList")
)
const RecommendedRoutineList = lazy(() =>
  import("../page/routine/components/RecommendedRoutineList")
)
const RoutineRecord = lazy(() =>
  import("../page/routine/components/RoutineRecord")
)
const RoutineCreate = lazy(() =>
  import("../page/routine/components/RoutineCreate")
)
const RoutineEdit = lazy(() => import("../page/routine/components/RoutineEdit"))
const RoutineDetail = lazy(() =>
  import("../page/routine/components/RoutineDetail")
)
const RecommendRoutineDetail = lazy(() =>
  import("../page/routine/components/RecommendRoutineDetail")
)

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
        children: [
          {
            path: "ongoing",
            element: (
              <Suspense fallback={<Loading />}>
                <OngoingRoutineList />
              </Suspense>
            ),
          },
          {
            path: "recommend",
            element: (
              <Suspense fallback={<Loading />}>
                <RecommendedRoutineList />
              </Suspense>
            ),
          },
          {
            path: "record",
            element: (
              <Suspense fallback={<Loading />}>
                <RoutineRecord />
              </Suspense>
            ),
          },
          {
            path: "create",
            element: (
              <Suspense fallback={<Loading />}>
                <RoutineCreate />
              </Suspense>
            ),
          },
          {
            path: "ongoing/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <RoutineDetail />
              </Suspense>
            ),
          },
          {
            path: "ongoing/:id/edit",
            element: (
              <Suspense fallback={<Loading />}>
                <RoutineEdit />
              </Suspense>
            ),
          },
          {
            path: "recommend/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <RecommendRoutineDetail />
              </Suspense>
            ),
          },
        ],
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
