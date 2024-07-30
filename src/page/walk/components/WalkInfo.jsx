import React from "react"
import WalkDogKcal from "./WalkDogKcal"

const WalkInfo = ({
  timer,
  distance,
  ownerCalories,
  currentDog,
  currentDogCalories,
  formatCalories,
  selectedDogs,
  currentDogIndex,
  handleNextDog,
  handlePrevDog,
  resultPage = false,
}) => {
  return (
    <>
      {resultPage ? (
        <>
          <div className="walk-result-info-container">
            <div className="walk-result-info-up-container">
              <div>
                <h2>산책 시간</h2>
                <p>{timer}</p>
              </div>
              <div>
                <h2>이동 거리 (km)</h2>
                <p>{distance.toFixed(2)}</p>
              </div>
            </div>
            <div className="walk-result-info-down-container">
              <div>
                <h2>견주 소모 칼로리 (kcal)</h2>
                <p>{formatCalories(ownerCalories)}</p>
              </div>

              <WalkDogKcal
                currentDog={currentDog}
                handleNextDog={handleNextDog}
                handlePrevDog={handlePrevDog}
                currentDogCalories={currentDogCalories}
                formatCalories={formatCalories}
                selectedDogs={selectedDogs}
                currentDogIndex={currentDogIndex}
                resultPage={true}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="walk-controls-backboard-info-up-container">
            <div className="walk-controls-backboard-walk-time-info">
              <h2>산책 시간</h2>
              <p>{timer}</p>
            </div>
            <div className="walk-controls-backboard-distance-info">
              <h2>이동 거리 (km)</h2>
              <p>{distance.toFixed(2)}</p>
            </div>
          </div>
          <hr className="walk-controls-backboard-info-hr" />
          <div className="walk-controls-backboard-info-down-container">
            <div className="walk-controls-backboard-person-walk-kcal-info">
              <h2>견주 소모 칼로리 (kcal)</h2>
              <p>{formatCalories(ownerCalories)}</p>
            </div>
            <WalkDogKcal
              currentDog={currentDog}
              handleNextDog={handleNextDog}
              handlePrevDog={handlePrevDog}
              currentDogCalories={currentDogCalories}
              formatCalories={formatCalories}
              selectedDogs={selectedDogs}
              currentDogIndex={currentDogIndex}
            />
          </div>
        </>
      )}
    </>
  )
}

export default WalkInfo
