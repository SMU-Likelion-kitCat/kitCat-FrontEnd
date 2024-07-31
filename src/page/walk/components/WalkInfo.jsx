import React, { useEffect, useState } from "react"
import WalkDogKcal from "./WalkDogKcal"
import { useSelector } from "react-redux"

const WalkInfo = ({
  timer,
  distance,
  currentDog,
  currentDogCalories,
  selectedDogs,
  currentDogIndex,
  handleNextDog,
  handlePrevDog,
  resultPage = false,
}) => {
  // Redux 상태를 직접 읽어보세요.
  const ownerCalories = useSelector((state) => state.location.ownerCalories)
  console.log("ownerCalories", ownerCalories)

  // formattedCalories 상태 추가
  const [formattedCalories, setFormattedCalories] = useState("0000")

  const formatCalories = (calories) => {
    if (!calories) return "0000"
    const formattedCalories = Math.round(calories * 100)
      .toString()
      .padStart(4, "0")
    return formattedCalories
  }

  // ownerCalories 변경 시 formattedCalories 업데이트
  useEffect(() => {
    setFormattedCalories(formatCalories(ownerCalories))
  }, [ownerCalories])

  // 상태 변경 감지
  useEffect(() => {
    console.log("WalkInfo 렌더링 - ownerCalories:", ownerCalories)
  }, [ownerCalories]) // ownerCalories 상태를 의존성 배열에 추가

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
                <p>{formattedCalories}</p>
              </div>

              <WalkDogKcal
                currentDog={currentDog}
                handleNextDog={handleNextDog}
                handlePrevDog={handlePrevDog}
                currentDogCalories={currentDogCalories}
                formatCalories={formattedCalories}
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
              <p>{formattedCalories}</p>
            </div>
            <WalkDogKcal
              currentDog={currentDog}
              handleNextDog={handleNextDog}
              handlePrevDog={handlePrevDog}
              currentDogCalories={currentDogCalories}
              formatCalories={formattedCalories}
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
