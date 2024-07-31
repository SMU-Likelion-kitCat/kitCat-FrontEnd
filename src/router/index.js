// import React, { lazy, Suspense } from "react"
// import { createBrowserRouter } from "react-router-dom"
// import Loading from "../components/Loading"
// import Layout from "../layout"
// import recommendRouter from "./recommendRouter"

// const Intro = lazy(() => import("../page/intro"))
// const Auth = lazy(() => import("../page/auth"))
// const Login = lazy(() => import("../page/auth/login"))
// const Register = lazy(() => import("../page/auth/register"))
// const Info = lazy(() => import("../page/auth/register/info"))

// const Routine = lazy(() => import("../page/routine"))

// const Record = lazy(() => import("../page/record"))
// const Walk = lazy(() => import("../page/walk"))
// const Community = lazy(() => import("../page/community"))
// const MyPage = lazy(() => import("../page/mypage"))
// const Result = lazy(() => import("../page/walk/result"))

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Intro />
//           </Suspense>
//         ),
//       },
//       {
//         path: "auth",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Auth />
//           </Suspense>
//         ),
//         children: [
//           {
//             path: "login",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Login />
//               </Suspense>
//             ),
//           },
//           {
//             path: "register",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Register />
//               </Suspense>
//             ),
//             children: [
//               {
//                 path: "info",
//                 element: (
//                   <Suspense fallback={<Loading />}>
//                     <Info />
//                   </Suspense>
//                 ),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: "routine",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Routine />
//           </Suspense>
//         ),
//         children: recommendRouter,
//       },
//       {
//         path: "record",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Record />
//           </Suspense>
//         ),
//       },
//       {
//         path: "walk",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Walk />
//           </Suspense>
//         ),
//         children: [
//           {
//             path: "result",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Result />
//               </Suspense>
//             ),
//           },
//         ],
//       },
//       {
//         path: "community",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Community />
//           </Suspense>
//         ),
//       },
//       {
//         path: "mypage",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <MyPage />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ])

// export default router

// import React, { lazy, Suspense } from "react"
// import { createBrowserRouter } from "react-router-dom"
// import Loading from "../components/Loading"
// import Layout from "../layout"
// import recommendRouter from "./recommendRouter"
// import LoginCheck from "../components/LoginCheck"

// const Intro = lazy(() => import("../page/intro"))
// const Auth = lazy(() => import("../page/auth"))
// const Login = lazy(() => import("../page/auth/login"))
// const Register = lazy(() => import("../page/auth/register"))
// const Info = lazy(() => import("../page/auth/register/info"))

// const Routine = lazy(() => import("../page/routine"))

// const Record = lazy(() => import("../page/record"))
// const Walk = lazy(() => import("../page/walk"))
// const Community = lazy(() => import("../page/community"))
// const MyPage = lazy(() => import("../page/mypage"))
// const Result = lazy(() => import("../page/walk/result"))

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Intro />
//           </Suspense>
//         ),
//       },
//       {
//         path: "auth",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Auth />
//           </Suspense>
//         ),
//         children: [
//           {
//             path: "login",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Login />
//               </Suspense>
//             ),
//           },
//           {
//             path: "register",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Register />
//               </Suspense>
//             ),
//             children: [
//               {
//                 path: "info",
//                 element: (
//                   <Suspense fallback={<Loading />}>
//                     <Info />
//                   </Suspense>
//                 ),
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: "routine",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <LoginCheck element={<Routine />} />
//           </Suspense>
//         ),
//         children: recommendRouter.map((route) => ({
//           ...route,
//           element: <LoginCheck element={<route.element />} />,
//         })),
//       },
//       {
//         path: "record",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <LoginCheck element={<Record />} />
//           </Suspense>
//         ),
//       },
//       {
//         path: "walk",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <LoginCheck element={<Walk />} />
//           </Suspense>
//         ),
//         children: [
//           {
//             path: "result",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <LoginCheck element={<Result />} />
//               </Suspense>
//             ),
//           },
//         ],
//       },
//       {
//         path: "community",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <LoginCheck element={<Community />} />
//           </Suspense>
//         ),
//       },
//       {
//         path: "mypage",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <LoginCheck element={<MyPage />} />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ])

// export default router

import React, { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import Loading from "../components/Loading"
import Layout from "../layout"
import recommendRouter from "./recommendRouter"
import LoginCheck from "../components/LoginCheck"

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
const Result = lazy(() => import("../page/walk/result"))

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
            {/* <LoginCheck element={<Walk />} /> */}
            <Walk />
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
      },
      {
        path: "mypage",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginCheck element={<MyPage />} />
          </Suspense>
        ),
      },
    ],
  },
])

export default router
