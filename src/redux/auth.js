import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
