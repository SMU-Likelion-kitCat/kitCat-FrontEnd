import React, { useEffect } from "react"
import { getColorByProgress } from "../../../utils/colorCalculate"

const WalkRoutine = ({
  routines = [],
  selectedRoutineId,
  setSelectedRoutineId,
}) => {
  useEffect(() => {
    console.log("WalkRoutin 업데이트 감지", selectedRoutineId)
  }, [selectedRoutineId])

  const getRoutineDescription = (routine) => {
    switch (routine.routineType) {
      case "칼로리 목표":
        return `${routine.count}주차 · ${routine.target}kcal 소모`
      case "시간 목표":
        return `${routine.count}주차 · ${routine.target}분`
      case "산책 거리 목표":
        return `${routine.count}주차 · ${routine.target}m`
      default:
        return ""
    }
  }

  const onClickSelectedRoutine = (routineId) => {
    if (routineId === selectedRoutineId) {
      setSelectedRoutineId(null)
    }
    setSelectedRoutineId(routineId)
  }

  return (
    <div className="walk-routine-container">
      {Array.isArray(routines) &&
        routines
          .filter((routine) => routine.progress < 100) // 진행률이 100% 이하인 루틴만 필터링
          .map((routine) => (
            <div
              key={routine.routineId}
              className="walk-routine-item-container"
            >
              <div className="walk-routine-info-container">
                <div>
                  <h2>진행중인 루틴</h2>
                  <h3>{routine.name}</h3>
                  <p>{getRoutineDescription(routine)}</p>
                </div>
                <div className="walk-routine-item-start-button-container">
                  <div
                    onClick={() => onClickSelectedRoutine(routine.routineId)}
                    className={`walk-routine-item-start-button ${
                      selectedRoutineId === routine.routineId ? "active" : ""
                    }`}
                  >
                    {selectedRoutineId === routine.routineId ? (
                      <p style={{ color: "#ffc401" }}>중지</p>
                    ) : (
                      <p>시작</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="walk-routine-item-achieve-percentage-container">
                <div className="walk-routine-item-achieve-progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${
                        routine.progress > 100 ? 100 : routine.progress
                      }%`,
                      backgroundColor: getColorByProgress(routine.progress),
                    }}
                  />
                </div>
                <div className="progress-text-container">
                  <span
                    className="progress-text-one"
                    style={{
                      color: getColorByProgress(routine.progress),
                    }}
                  >
                    {routine.progress}
                  </span>
                  <span className="progress-text-two">/100</span>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default WalkRoutine
