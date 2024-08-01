import React from "react"
import RoutineCard from "./RoutineCard"

const RoutineList_O = ({ routines = [], viewMode }) => {
  const formatDescription = (routine) => {
    console.log("들어온 루틴", routine)
    const { routineType, routineTerm, routineBase, count } = routine

    return `${routineType} · ${routineTerm} 루틴 · ${routineBase}에 ${count}번`
  }

  return (
    <div className={`routine-list ${viewMode}`}>
      {routines.map((routine) => (
        <RoutineCard
          key={routine.routineId}
          id={routine.routineId}
          title={routine.name}
          routineTerm={routine.routineTerm}
          description={formatDescription(routine)}
          progress={routine.progress}
          color={routine.colorCode}
          highlight={routine.highlight}
        />
      ))}
    </div>
  )
}

export default RoutineList_O
