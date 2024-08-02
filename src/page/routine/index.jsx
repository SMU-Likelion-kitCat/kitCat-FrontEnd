import React, { createContext, useContext, useState } from "react"
import RoutineDashboard from "./components/RoutineDashboard"
import { Outlet, useLocation } from "react-router-dom"

const RoutineContext = createContext()

export const useSelectRecommendRoutine = () => useContext(RoutineContext)

const Routine = () => {
  const location = useLocation()
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  const isRoutinePath = location.pathname == "/routine"
  return (
    <RoutineContext.Provider value={{ selectedRoutine, setSelectedRoutine }}>
      {isRoutinePath && <RoutineDashboard />}
      <Outlet />
    </RoutineContext.Provider>
  )
}

export default Routine
