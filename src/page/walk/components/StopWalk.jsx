import React from "react"
import { ReactComponent as ControlBackBoard } from "../../../assets/walk/ControlBackBoard.svg"
import { ReactComponent as ClickControlBackBoard } from "../../../assets/walk/ClickControlBackBoard.svg"
import { ReactComponent as PauseIcon } from "../../../assets/walk/PauseIcon.svg"
import { ReactComponent as ReStartIcon } from "../../../assets/walk/StartIcon.svg"
import { ReactComponent as StopIcon } from "../../../assets/walk/StopIcon.svg"
import WalkInfo from "./WalkInfo"

const StopWalk = ({
  onClickStopTracking,
  onClickPauseTracking,
  onClickRestartTracking,
  isPaused,
  timer,
  location,
  selectedDogs,
  currentDog,
  currentDogCalories,
  currentDogIndex,
  handleNextDog,
  handlePrevDog,
}) => {
  const formatCalories = (calories) => {
    if (!calories) return "000"
    const formattedCalories = Math.round(calories).toString().padStart(3, "0")
    return formattedCalories
  }

  return (
    <div className="walk-controls-backboard-container">
      <div className="walk-controls-backboard-item-container">
        <>
          {isPaused ? (
            <>
              <ClickControlBackBoard />
              <div className="walk-controls-backboard-pause-click-icon-container">
                <div
                  className="walk-controls-backboard-restart-icon-container"
                  onClick={onClickRestartTracking}
                >
                  <ReStartIcon />
                </div>
                <div
                  className="walk-controls-backboard-stop-icon-container"
                  onClick={onClickStopTracking}
                >
                  <StopIcon />
                </div>
              </div>
            </>
          ) : (
            <>
              <ControlBackBoard />
              <PauseIcon
                onClick={onClickPauseTracking}
                className="walk-controls-backboard-pause-icon"
              />
            </>
          )}

          <WalkInfo
            timer={timer}
            distance={location.distance}
            ownerCalories={location.ownerCalories}
            currentDog={currentDog}
            currentDogCalories={currentDogCalories}
            formatCalories={formatCalories}
            selectedDogs={selectedDogs}
            currentDogIndex={currentDogIndex}
            handleNextDog={handleNextDog}
            handlePrevDog={handlePrevDog}
          />
        </>
      </div>
    </div>
  )
}

export default StopWalk
