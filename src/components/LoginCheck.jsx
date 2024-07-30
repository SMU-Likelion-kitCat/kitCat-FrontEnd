import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import apiConfig from "../api/apiConfig"
import store from "../redux/store"
import { logout } from "../redux/auth"

const LoginCheck = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return isLoggedIn ? element : <Navigate to="/auth/login" />
}

export default LoginCheck

export const checkTokenValidity = async () => {
  try {
    await apiConfig.post("/user/info")
  } catch (error) {
    if (error.response && error.response.status === 403) {
      store.dispatch(logout())
    }
  }
}

export const startTokenCheckInterval = () => {
  setInterval(() => {
    checkTokenValidity()
  }, 3600000) // 1 hour in milliseconds
}
