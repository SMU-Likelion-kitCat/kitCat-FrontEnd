import React from "react"
import RoutineDashboard from "./components/RoutineDashboard"
import { Outlet, useLocation } from "react-router-dom"

const Routine = () => {
  const location = useLocation()

  const isRoutinePath = location.pathname == "/routine"
  return (
    <div>
      {isRoutinePath && <RoutineDashboard />}
      <Outlet />
    </div>
  )
}

export default Routine
