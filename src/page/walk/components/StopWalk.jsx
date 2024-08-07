import React, { useState } from "react"
import { ReactComponent as ControlBackBoard } from "../../../assets/walk/ControlBackBoard.svg"
import { ReactComponent as ClickControlBackBoard } from "../../../assets/walk/ClickControlBackBoard.svg"
import { ReactComponent as PauseIcon } from "../../../assets/walk/PauseIcon.svg"
import { ReactComponent as ReStartIcon } from "../../../assets/walk/StartIcon.svg"
import { ReactComponent as StopIcon } from "../../../assets/walk/StopIcon.svg"
import ConrtolBoardGif from "../../../assets/walk/ConrtolBoardGif.gif"
import WalkInfo from "./WalkInfo"

const StopWalk = ({
  onClickStopTracking,
  onClickPauseTracking,
  onClickRestartTracking,
  isPaused,
  currentDog,
  currentDogCalories,
  currentDogIndex,
  handleNextDog,
  handlePrevDog,
}) => {
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
              <div className="walk-controls-backboard-gif-one">
                <img src={ConrtolBoardGif} alt="Control Board" />
              </div>
              <div className="walk-controls-backboard-gif-two">
                <img src={ConrtolBoardGif} alt="Control Board" />
              </div>
            </>
          )}

          <WalkInfo
            currentDog={currentDog}
            currentDogCalories={currentDogCalories}
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
