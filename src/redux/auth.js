// import { createSlice } from "@reduxjs/toolkit"

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false, // 로그인 상태
//     accessToken: "",
//     nickname: "",
//     weight: 0,
//     height: 0,
//     bmi: 0,
//     petInfos: [], // 반려견들 정보
//   },
//   reducers: {
//     setToken: (state, action) => {
//       state.accessToken = action.payload
//       state.isLoggedIn = true
//     },
//     setUserInfo: (state, action) => {
//       const { nickname, weight, height, bmi } = action.payload
//       state.nickname = nickname
//       state.weight = weight
//       state.height = height
//       state.bmi = bmi
//     },
//     logout: (state) => {
//       state.accessToken = ""
//       state.isLoggedIn = false
//       state.nickname = ""
//       state.weight = 0
//       state.height = 0
//       state.bmi = 0
//     },
//   },
// })

// export const { setToken, setUserInfo, logout } = authSlice.actions

// export default authSlice.reducer

// import { createSlice } from "@reduxjs/toolkit"

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false, // 로그인 상태
//     accessToken: "",
//     nickname: "",
//     weight: 0,
//     height: 0,
//     bmi: 0,
//     petInfos: [], // 반려견들 정보
//   },
//   reducers: {
//     setToken: (state, action) => {
//       state.accessToken = action.payload
//       state.isLoggedIn = true
//     },
//     setUserInfo: (state, action) => {
//       const { nickname, weight, height, bmi } = action.payload
//       state.nickname = nickname
//       state.weight = weight
//       state.height = height
//       state.bmi = bmi
//       console.log("업데이트된 userInfo", state)
//     },
//     setPetInfos: (state, action) => {
//       state.petInfos = action.payload
//     },
//     logout: (state) => {
//       state.accessToken = ""
//       state.isLoggedIn = false
//       state.nickname = ""
//       state.weight = 0
//       state.height = 0
//       state.bmi = 0
//       state.petInfos = []
//     },
//   },
// })

// export const { setToken, setUserInfo, setPetInfos, logout } = authSlice.actions

// export default authSlice.reducer

// authSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
  isLoggedIn: false,
  accessToken: "",
  nickname: "",
  weight: 0,
  height: 0,
  bmi: 0,
  petInfos: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
      state.isLoggedIn = true
    },
    setUserInfo: (state, action) => {
      const { nickname, weight, height, bmi } = action.payload
      state.nickname = nickname
      state.weight = weight
      state.height = height
      state.bmi = bmi
      console.log("업데이트된 userInfo", state)
    },
    setPetInfos: (state, action) => {
      state.petInfos = action.payload
    },
    logout: () => {
      return initialAuthState
    },
    resetAuthState: () => initialAuthState,
  },
})

export const { setToken, setUserInfo, setPetInfos, logout, resetAuthState } =
  authSlice.actions

export default authSlice.reducer
