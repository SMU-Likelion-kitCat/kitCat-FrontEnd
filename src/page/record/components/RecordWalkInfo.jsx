// import React from "react"

// const RecordWalkInfo = ({record}) => {
//   return (
//     <>
//       <div className="walk-result-info-container">
//         <div className="walk-result-info-up-container">
//           <div>
//             <h2>산책 시간</h2>
//             <p>{location.timer}</p>
//           </div>
//           <div>
//             <h2>이동 거리 (km)</h2>
//             <p>{(location.distance / 1000).toFixed(2)}</p>
//           </div>
//         </div>
//         <div className="walk-result-info-down-container">
//           <div>
//             <h2>견주 소모 칼로리 (kcal)</h2>
//             <p>{formattedCalories}</p>
//           </div>

//           <div
//             className={
//               resultPage
//                 ? "walk-result-info-dog-walk-kcal-info"
//                 : "walk-controls-backboard-dog-walk-kcal-info"
//             }
//           >
//             <h2>반려견 소모 칼로리 (kcal)</h2>
//             <div className="walk-controls-backboard-dog-selection-container">
//               <div className="walk-controls-backboard-dog-selection-info-container">
//                 <DogLeftArrow onClick={handlePrevDog} />
//                 <div className="walk-controls-backboard-dog-selection-info">
//                   <img
//                     className="walk-controls-backboard-dog-selection-profile"
//                     src={
//                       `https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${currentDog?.image}` ||
//                       "https://png.pngtree.com/png-vector/20230221/ourmid/pngtree-cute-dog-illustration-png-image_6612074.png"
//                     }
//                     alt={currentDog?.name || "Dog"}
//                   />
//                   <p>
//                     {currentDogCalories
//                       ? formatDogCalories(currentDogCalories.calories)
//                       : "000"}
//                   </p>
//                 </div>
//                 <DogRightArrow onClick={handleNextDog} />
//               </div>
//               <div
//                 className="walk-controls-backboard-dog-selection-step-container"
//                 ref={stepContainerRef}
//               >
//                 {location.selectedDogs.map((dog, index) => (
//                   <div
//                     key={dog.id}
//                     className={`walk-controls-backboard-dog-selection-step ${
//                       index === currentDogIndex ? "active" : ""
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default RecordWalkInfo

// import React from "react"

// const RecordWalkInfo = ({ records }) => {
//   const formatDogCalories = (calories) => `${calories} kcal`

//   const { walkTime, distance, calorie, petRecords } = records

//   const formattedCalories = formatDogCalories(calorie)
//   const formattedDistance = (distance / 1000).toFixed(2)
//   const formattedWalkTime = `${walkTime} 분`

//   return (
//     <div className="walk-result-info-container">
//       <div className="walk-result-info-up-container">
//         <div>
//           <h2>산책 시간</h2>
//           <p>{formattedWalkTime}</p>
//         </div>
//         <div>
//           <h2>이동 거리 (km)</h2>
//           <p>{formattedDistance}</p>
//         </div>
//       </div>
//       <div className="walk-result-info-down-container">
//         <div>
//           <h2>견주 소모 칼로리 (kcal)</h2>
//           <p>{formattedCalories}</p>
//         </div>
//         <div className="walk-controls-backboard-dog-selection-container">
//           {petRecords.map((pet, index) => (
//             <div
//               key={index}
//               className="walk-controls-backboard-dog-selection-info-container"
//             >
//               <img
//                 className="walk-controls-backboard-dog-selection-profile"
//                 src={`https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${pet.image}`}
//                 alt={pet.image}
//               />
//               <p>{formatDogCalories(pet.calorie)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RecordWalkInfo

import React from "react"

const RecordWalkInfo = ({ records }) => {
  // records가 유효한지 확인
  if (!records) {
    return null // 또는 로딩 스피너나 에러 메시지를 표시할 수 있습니다.
  }

  const formatDogCalories = (calories) => `${calories} kcal`

  const { walkTime, distance, calorie, petRecords } = records

  const formattedCalories = formatDogCalories(calorie)
  const formattedDistance = (distance / 1000).toFixed(2)
  const formattedWalkTime = `${walkTime} 분`

  return (
    <div className="walk-result-info-container">
      <div className="walk-result-info-up-container">
        <div>
          <h2>산책 시간</h2>
          <p>{formattedWalkTime}</p>
        </div>
        <div>
          <h2>이동 거리 (km)</h2>
          <p>{formattedDistance}</p>
        </div>
      </div>
      <div className="walk-result-info-down-container">
        <div>
          <h2>견주 소모 칼로리 (kcal)</h2>
          <p>{formattedCalories}</p>
        </div>
        <div className="walk-controls-backboard-dog-selection-container">
          {petRecords &&
            petRecords.map((pet, index) => (
              <div
                key={index}
                className="walk-controls-backboard-dog-selection-info-container"
              >
                <img
                  className="walk-controls-backboard-dog-selection-profile"
                  src={`https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${pet.image}`}
                  alt={pet.image}
                />
                <p>{formatDogCalories(pet.calorie)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default RecordWalkInfo
