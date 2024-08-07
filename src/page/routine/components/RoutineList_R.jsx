import React from "react"
import RecommendedRoutineCard from "./RecommendedRoutineCard"

const RoutineList_R = ({ routines = [], viewMode }) => {
  const formatDescription = (routine) => {
    const { type, duration, unit, amount } = routine
    return `${type} · ${duration} 루틴 · ${unit}에 ${amount}번`
  }

  return (
    <div className={`routine-list ${viewMode}`}>
      {routines.map((routine) => (
        <RecommendedRoutineCard
          key={routine.id}
          id={routine.id}
          title={routine.title}
          routine={routine}
          description={formatDescription(routine)}
        />
      ))}
    </div>
  )
}

export default RoutineList_R
