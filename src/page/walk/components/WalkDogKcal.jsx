import React, { useEffect, useRef } from "react"
import { ReactComponent as DogLeftArrow } from "../../../assets/walk/DogLeftArrow.svg"
import { ReactComponent as DogRightArrow } from "../../../assets/walk/DogRightArrow.svg"
import { useSelector } from "react-redux"

const WalkDogKcal = ({
  currentDog,
  handleNextDog,
  handlePrevDog,
  currentDogCalories,
  currentDogIndex,
  resultPage,
}) => {
  const location = useSelector((state) => state.location)

  const stepContainerRef = useRef(null)

  useEffect(() => {
    const stepContainer = stepContainerRef.current
    const childCount = stepContainer.childElementCount

    if (childCount === 1) {
      stepContainer.style.justifyContent = "center"
    } else {
      stepContainer.style.justifyContent = "space-between"
    }
  }, [location.selectedDogs])

  const formatDogCalories = (calories) => {
    if (!calories) return "000"
    return Math.round(calories).toString().padStart(3, "0")
  }

  return (
    <div
      className={
        resultPage
          ? "walk-result-info-dog-walk-kcal-info"
          : "walk-controls-backboard-dog-walk-kcal-info"
      }
    >
      <h2>반려견 소모 칼로리 (kcal)</h2>
      <div className="walk-controls-backboard-dog-selection-container">
        <div className="walk-controls-backboard-dog-selection-info-container">
          <DogLeftArrow onClick={handlePrevDog} />
          <div className="walk-controls-backboard-dog-selection-info">
            <img
              className="walk-controls-backboard-dog-selection-profile"
              src={
                `https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${currentDog?.image}` ||
                "https://png.pngtree.com/png-vector/20230221/ourmid/pngtree-cute-dog-illustration-png-image_6612074.png"
              }
              alt={currentDog?.name || "Dog"}
            />
            <p>
              {currentDogCalories
                ? formatDogCalories(currentDogCalories.calories)
                : "000"}
            </p>
          </div>
          <DogRightArrow onClick={handleNextDog} />
        </div>
        <div
          className="walk-controls-backboard-dog-selection-step-container"
          ref={stepContainerRef}
        >
          {location.selectedDogs.map((dog, index) => (
            <div
              key={dog.id}
              className={`walk-controls-backboard-dog-selection-step ${
                index === currentDogIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalkDogKcal
