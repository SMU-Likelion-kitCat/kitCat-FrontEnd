// import React, { lazy, Suspense } from "react"
// import Loading from "../components/Loading"

// const OngoingRoutineList = lazy(() =>
//   import("../page/routine/components/OngoingRoutineList")
// )
// const RecommendedRoutineList = lazy(() =>
//   import("../page/routine/components/RecommendedRoutineList")
// )
// const RoutineRecord = lazy(() =>
//   import("../page/routine/components/RoutineRecord")
// )
// const RoutineCreate = lazy(() =>
//   import("../page/routine/components/RoutineCreate")
// )
// const RoutineEdit = lazy(() => import("../page/routine/components/RoutineEdit"))
// const RoutineDetail = lazy(() =>
//   import("../page/routine/components/RoutineDetail")
// )
// const RecommendRoutineDetail = lazy(() =>
//   import("../page/routine/components/RecommendRoutineDetail")
// )

// const recommendRouter = [
//   {
//     path: "ongoing",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <OngoingRoutineList />
//       </Suspense>
//     ),
//   },
//   {
//     path: "recommend",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RecommendedRoutineList />
//       </Suspense>
//     ),
//   },
//   {
//     path: "record",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RoutineRecord />
//       </Suspense>
//     ),
//   },
//   {
//     path: "create",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RoutineCreate />
//       </Suspense>
//     ),
//   },
//   {
//     path: "ongoing/:id",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RoutineDetail />
//       </Suspense>
//     ),
//   },
//   {
//     path: "ongoing/:id/edit",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RoutineEdit />
//       </Suspense>
//     ),
//   },
//   {
//     path: "recommend/:id",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <RecommendRoutineDetail />
//       </Suspense>
//     ),
//   },
// ]

// export default recommendRouter

import React, { lazy, Suspense } from "react"
import Loading from "../components/Loading"

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

const recommendRouter = [
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
]

export default recommendRouter
