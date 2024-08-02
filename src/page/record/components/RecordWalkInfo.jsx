// import React, { useState } from "react"
// import { formatWalkTime } from "../../../utils/timeCasting"
// import { ReactComponent as DogLeftArrow } from "../../../assets/walk/DogLeftArrow.svg"
// import { ReactComponent as DogRightArrow } from "../../../assets/walk/DogRightArrow.svg"

// const RecordWalkInfo = ({ records }) => {
//   const [selectedDogIndex, setSelectedDogIndex] = useState(0)

//   if (!records) {
//     return null // 또는 로딩 스피너나 에러 메시지를 표시할 수 있습니다.
//   }

//   const { walkTime, distance, calorie, petRecords } = records
//   const formattedDistance = (distance / 1000).toFixed(2)
//   const formattedWalkTime = formatWalkTime(walkTime)

//   const handlePreviousDog = () => {
//     setSelectedDogIndex((prevIndex) =>
//       prevIndex === 0 ? petRecords.length - 1 : prevIndex - 1
//     )
//   }

//   const handleNextDog = () => {
//     setSelectedDogIndex((prevIndex) =>
//       prevIndex === petRecords.length - 1 ? 0 : prevIndex + 1
//     )
//   }

//   const selectedDog = petRecords[selectedDogIndex]

//   return (
//     <div className="record-walk-info-container">
//       <div className="record-walk-info-up-container">
//         <div>
//           <h2>산책 시간</h2>
//           <p>{formattedWalkTime}</p>
//         </div>
//         <div>
//           <h2>이동 거리 (km)</h2>
//           <p>{formattedDistance}</p>
//         </div>
//       </div>
//       <div className="record-walk-info-down-container">
//         <div>
//           <h2>견주 소모 칼로리 (kcal)</h2>
//           <p>{calorie}</p>
//         </div>
//         <div className="record-walk-info-selection-container">
//           <DogLeftArrow
//             onClick={handlePreviousDog}
//             style={{ cursor: "pointer" }}
//           />
//           <div className="record-walk-info-selection-dog-container">
//             <img
//               className="record-walk-info-selection-dog-selection-profile"
//               src={`https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${selectedDog.image}`}
//               alt={selectedDog.image}
//             />
//             <p>{selectedDog.calorie}</p>
//           </div>
//           <DogRightArrow
//             onClick={handleNextDog}
//             style={{ cursor: "pointer" }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RecordWalkInfo

import React, { useState } from "react"
import { formatWalkTime } from "../../../utils/timeCasting"
import { ReactComponent as DogLeftArrow } from "../../../assets/walk/DogLeftArrow.svg"
import { ReactComponent as DogRightArrow } from "../../../assets/walk/DogRightArrow.svg"

const RecordWalkInfo = ({ records }) => {
  const [selectedDogIndex, setSelectedDogIndex] = useState(0)

  if (!records) {
    return null // 또는 로딩 스피너나 에러 메시지를 표시할 수 있습니다.
  }

  const { walkTime, distance, calorie, petRecords } = records
  const formattedDistance = (distance / 1000).toFixed(2)
  const formattedWalkTime = formatWalkTime(walkTime)

  const handlePreviousDog = () => {
    setSelectedDogIndex((prevIndex) =>
      prevIndex === 0 ? petRecords.length - 1 : prevIndex - 1
    )
  }

  const handleNextDog = () => {
    setSelectedDogIndex((prevIndex) =>
      prevIndex === petRecords.length - 1 ? 0 : prevIndex + 1
    )
  }

  const selectedDog = petRecords[selectedDogIndex]

  return (
    <div className="record-walk-info-container">
      <div className="record-walk-info-up-container">
        <div>
          <h2>산책 시간</h2>
          <p>{formattedWalkTime}</p>
        </div>
        <div>
          <h2>이동 거리 (km)</h2>
          <p>{formattedDistance}</p>
        </div>
      </div>
      <div className="record-walk-info-down-container">
        <div>
          <h2>견주 소모 칼로리 (kcal)</h2>
          <p>{calorie}</p>
        </div>
      </div>
      <div className="record-walk-info-selection-container">
        <h2>반려견 소모 칼로리 (kcal)</h2>
        <div className="record-walk-info-selection-content-container">
          <DogLeftArrow
            onClick={handlePreviousDog}
            style={{ cursor: "pointer" }}
          />
          <div className="record-walk-info-selection-dog-container">
            <img
              className="record-walk-info-selection-dog-selection-profile"
              src={`https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${selectedDog.image}`}
              alt={selectedDog.image}
            />
            <p>{selectedDog.calorie}</p>
          </div>
          <DogRightArrow
            onClick={handleNextDog}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  )
}

export default RecordWalkInfo
