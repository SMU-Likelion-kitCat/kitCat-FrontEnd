// import React from "react"
// import RoutineCard from "./RoutineCard"

// const RoutineList_O = ({ routines = [], viewMode }) => {
//   const formatDescription = (routine) => {
//     const { type, duration, unit, amount } = routine
//     return `${type} · ${duration} 루틴 · ${unit}에 ${amount}번`
//   }

//   return (
//     <div className={`routine-list ${viewMode}`}>
//       {routines.map((routine) => (
//         <RoutineCard
//           id={routine.id}
//           title={routine.title}
//           description={formatDescription(routine)}
//           progress={routine.progress}
//           color={routine.color}
//           highlight={routine.highlight}
//         />
//       ))}
//     </div>
//   )
// }

// export default RoutineList_O

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
