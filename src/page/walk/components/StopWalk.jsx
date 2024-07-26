import React, { useState } from "react"

import { ReactComponent as ControlBackBoard } from "../../../assets/walk/ControlBackBoard.svg"
import { ReactComponent as ClickControlBackBoard } from "../../../assets/walk/ClickControlBackBoard.svg"
import { ReactComponent as PauseIcon } from "../../../assets/walk/PauseIcon.svg"
import { ReactComponent as ReStartIcon } from "../../../assets/walk/StartIcon.svg"
import { ReactComponent as StopIcon } from "../../../assets/walk/StopIcon.svg"
import { ReactComponent as DogLeftArrow } from "../../../assets/walk/DogLeftArrow.svg"
import { ReactComponent as DogRightArrow } from "../../../assets/walk/DogRightArrow.svg"

const StopWalk = ({
  onClickStopTracking,
  onClickPauseTracking,
  onClickRestartTracking,
  isPaused,
  timer,
  location,
  selectedDogs,
}) => {
  const [currentDogIndex, setCurrentDogIndex] = useState(0)

  const handleNextDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === selectedDogs.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === 0 ? selectedDogs.length - 1 : prevIndex - 1
    )
  }

  const currentDog = selectedDogs[currentDogIndex]

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
              <div className="walk-controls-backboard-dog-selection-container">
                <DogLeftArrow onClick={handlePrevDog} />
                <div className="walk-controls-backboard-dog-selection-info-container">
                  <div className="walk-controls-backboard-dog-selection-info">
                    <img
                      className="walk-controls-backboard-dog-selection-profile"
                      src={
                        "https://png.pngtree.com/png-vector/20230221/ourmid/pngtree-cute-dog-illustration-png-image_6612074.png" ||
                        currentDog.image
                      }
                      alt={currentDog.name}
                    />
                    <p>{location.petCalories}</p>
                  </div>
                  <div className="walk-controls-backboard-dog-selection-step-container">
                    {selectedDogs.map((dog, index) => (
                      <div
                        key={dog.id}
                        className={`walk-controls-backboard-dog-selection-step ${
                          index === currentDogIndex ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <DogRightArrow onClick={handleNextDog} />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default StopWalk
