import React from "react"
import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  )
}

export default Auth
