import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import KakaoMap from "../../../components/KakaoMap"
import WalkInfo from "../components/WalkInfo"

const Result = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    path,
    distance,
    timer,
    ownerCalories,
    selectedDogs,
    petCalories = [],
  } = location.state

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

  const currentDogCalories = petCalories.find(
    (calorie) => calorie.petId === currentDog.id
  )

  const formatCalories = (calories) => {
    if (!calories) return "000"
    const formattedCalories = Math.round(calories).toString().padStart(3, "0")
    return formattedCalories
  }

  const formatDate = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"]
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dayName = days[date.getDay()]
    return `${year}.${month}.${day}(${dayName})`
  }

  return (
    <div className="walk-result-container">
      <div className="walk-result-title-container">
        <div className="walk-result-title">
          <h2>
            오늘도
            <br /> 산책을 완료했어요!
          </h2>
          <p>{formatDate(new Date())}</p>
        </div>
        <div className="walk-result-title-buttom-container">
          <button>확인</button>
        </div>
      </div>

      <div className="walk-result-map">
        <KakaoMap location={location} path={path} readWalkPath={true} />
      </div>

      <WalkInfo
        timer={timer}
        distance={distance}
        ownerCalories={ownerCalories}
        currentDog={currentDog}
        currentDogCalories={currentDogCalories}
        formatCalories={formatCalories}
        selectedDogs={selectedDogs}
        currentDogIndex={currentDogIndex}
        handleNextDog={handleNextDog}
        handlePrevDog={handlePrevDog}
        resultPage={true}
      />

      <div className="walk-result-info-share-container">
        <h2>
          산책 후기를
          <br />
          다른 사람들과 공유해 보세요!
        </h2>

        <button onClick={() => navigate("/routine")}>공유</button>
      </div>
    </div>
  )
}

export default Result
