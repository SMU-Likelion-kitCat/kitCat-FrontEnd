// import React from "react"
// import "./scss/style.scss"
// import { RouterProvider } from "react-router-dom"
// import router from "./router"
// // import { createStore } from "redux";
// // import rootReducer from "./redux"
// import { Provider, useDispatch } from "react-redux"
// import store from "./redux/store"
// // 리덕스에 비동기 작업도 실행시키기 위해 redux-thunk를 적용함
// // const store = createStore(rootReducer)

// const dispatch = useDispatch()

// useEffect(() => {
//   startTokenCheckInterval()
// }, [dispatch])

// const App = () => {
//   return (
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   )
// }

// export default App

import React, { useEffect } from "react"
import "./scss/style.scss"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Provider, useDispatch } from "react-redux"
import store from "./redux/store"
import { startTokenCheckInterval } from "./components/LoginCheck"

const AppContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    startTokenCheckInterval(dispatch)
  }, [dispatch])

  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
