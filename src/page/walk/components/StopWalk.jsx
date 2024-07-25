import React from "react"

import { ReactComponent as ControlBackBoard } from "../../../assets/walk/ControlBackBoard.svg"
import { ReactComponent as ClickControlBackBoard } from "../../../assets/walk/ClickControlBackBoard.svg"
import { ReactComponent as PauseIcon } from "../../../assets/walk/PauseIcon.svg"
import { ReactComponent as ReStartIcon } from "../../../assets/walk/StartIcon.svg"
import { ReactComponent as StopIcon } from "../../../assets/walk/StopIcon.svg"

const StopWalk = ({
  onClickStopTracking,
  onClickPauseTracking,
  onClickRestartTracking,
  isPaused,
  timer,
  location,
}) => {
  return (
    <div className="walk-controls-backboard-container">
      <div className="walk-controls-backboard-item-container">
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
                onClick={onClickRestartTracking}
              >
                <StopIcon />
              </div>
            </div>
            <div className="walk-controls-backboard-info-up-container">
              <div className="walk-controls-backboard-walk-time-info">
                <h2>산책 시간</h2>
                <p>{timer}</p>
              </div>
              <div className="walk-controls-backboard-distance-info">
                <h2>이동 거리 (km)</h2>
                <p>{location.distance.toFixed(2)}</p>
              </div>
            </div>
            <hr className="walk-controls-backboard-info-hr" />
            <div className="walk-controls-backboard-info-down-container">
              <div className="walk-controls-backboard-person-walk-kcal-info">
                <h2>견주 소모 칼로리 (kcal)</h2>
                <p>{location.ownerCalories}</p>
              </div>
              <div className="walk-controls-backboard-dog-walk-kcal-info">
                <h2>반려견 소모 칼로리 (kcal)</h2>
                <p>{location.petCalories}</p>
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
            <div className="walk-controls-backboard-info-up-container">
              <div className="walk-controls-backboard-walk-time-info">
                <h2>산책 시간</h2>
                <p>{timer}</p>
              </div>
              <div className="walk-controls-backboard-distance-info">
                <h2>이동 거리 (km)</h2>
                <p>{location.distance.toFixed(2)}</p>
              </div>
            </div>
            <hr className="walk-controls-backboard-info-hr" />
            <div className="walk-controls-backboard-info-down-container">
              <div className="walk-controls-backboard-person-walk-kcal-info">
                <h2>견주 소모 칼로리 (kcal)</h2>
                <p>{location.ownerCalories}</p>
              </div>
              <div className="walk-controls-backboard-dog-walk-kcal-info">
                <h2>반려견 소모 칼로리 (kcal)</h2>
                <p>{location.petCalories}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StopWalk
