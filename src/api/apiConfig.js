// import axios from "axios"
// import store from "../redux/store"
// import { logout } from "../redux/auth"

// const apiConfig = axios.create({
//   baseURL: "/api/v1",
// })

// apiConfig.interceptors.request.use((config) => {
//   const state = store.getState()
//   const token = state.auth.accessToken
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// apiConfig.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       store.dispatch(logout())
//     }
//     return Promise.reject(error)
//   }
// )

// export default apiConfig

import axios from "axios"
import store from "../redux/store"
import { logout } from "../redux/auth"

const apiConfig = axios.create({
  baseURL: "/api/v1",
})

apiConfig.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export const checkTokenValidity = async () => {
  try {
    await apiConfig.post("/user/info")
  } catch (error) {
    if (error.response && error.response.status === 403) {
      store.dispatch(logout())
    }
  }
}

export const startTokenCheckInterval = (dispatch) => {
  setInterval(() => {
    checkTokenValidity(dispatch)
  }, 3600000) // 1시간
}

export default apiConfig
