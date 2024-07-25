import React from "react"
import { ReactComponent as DogLogo } from "../../../assets/walk/DogLogo.svg"
import { ReactComponent as CurrentPosition } from "../../../assets/walk/CurrentPosition.svg"
import { ReactComponent as StartIcon } from "../../../assets/walk/StartIcon.svg"

const StartWalk = ({
  onClickStartTracking,
  onShowDogSelection,
  selectedDogs,
}) => {
  return (
    <div className="walk-controls-container">
      <div className="walk-controls-board-container">
        <div
          className="walk-controls-dogs-info-container"
          onClick={onShowDogSelection}
        >
          <div
            className={
              selectedDogs.length > 0
                ? "walk-controls-dogs-info active"
                : "walk-controls-dogs-info"
            }
          >
            <DogLogo />
            {selectedDogs.length > 0 && (
              <div className="walk-controls-dogs-info-count-container">
                <div className="walk-controls-dogs-info-count-background">
                  <p className="walk-controls-dogs-info-count">
                    {selectedDogs.length}
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="walk-controls-dogs-info-title">강아지 선택</p>
        </div>

        <div className="walk-controls-start-button-background">
          <button
            className="walk-controls-start-button"
            onClick={onClickStartTracking}
          >
            <StartIcon />
            <p className="walk-controls-start-button-text">산책 시작</p>
          </button>
        </div>
        <div className="walk-controls-current-position">
          <CurrentPosition />
        </div>
      </div>
    </div>
  )
}

export default StartWalk
