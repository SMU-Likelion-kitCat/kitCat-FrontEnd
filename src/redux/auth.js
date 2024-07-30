import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, // 로그인 상태
    accessToken: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.accessToken = ""
      state.isLoggedIn = false
    },
  },
})

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer
