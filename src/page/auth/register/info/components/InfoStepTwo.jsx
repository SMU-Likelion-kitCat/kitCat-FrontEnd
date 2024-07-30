// import React, { useEffect, useState } from "react"

// const InfoStepTwo = ({ userInfo, setUserInfo }) => {
//   const [localUserInfo, setLocalUserInfo] = useState(userInfo)

//   useEffect(() => {
//     if (localUserInfo.height && localUserInfo.weight) {
//       const heightInMeters = localUserInfo.height / 100
//       const calculatedBmi = (
//         localUserInfo.weight /
//         (heightInMeters * heightInMeters)
//       ).toFixed(1)
//       if (calculatedBmi !== localUserInfo.bmi) {
//         setLocalUserInfo((prevState) => ({
//           ...prevState,
//           bmi: calculatedBmi,
//         }))
//       }
//     }
//   }, [localUserInfo.height, localUserInfo.weight])

//   useEffect(() => {
//     setUserInfo(localUserInfo)
//   }, [localUserInfo])

//   const handleHeightChange = (e) => {
//     const { value } = e.target
//     if (/^\d*$/.test(value)) {
//       setLocalUserInfo((prevState) => ({
//         ...prevState,
//         height: value,
//       }))
//     }
//   }

//   const handleWeightChange = (e) => {
//     const value = e.target.value
//     if (/^\d*$/.test(value)) {
//       setLocalUserInfo((prevState) => ({
//         ...prevState,
//         weight: value,
//       }))
//     }
//   }

//   const calculateIndicatorPosition = () => {
//     if (!localUserInfo.bmi) return "0%"

//     const minBmi = 10
//     const maxBmi = 40
//     const clampedBmi = Math.max(minBmi, Math.min(localUserInfo.bmi, maxBmi))

//     const ranges = [
//       { min: 10, max: 18.5, start: 0, end: 20 },
//       { min: 18.5, max: 24.9, start: 20, end: 40 },
//       { min: 24.9, max: 29.9, start: 40, end: 60 },
//       { min: 29.9, max: 34.9, start: 60, end: 80 },
//       { min: 34.9, max: 40, start: 80, end: 100 },
//     ]

//     const range = ranges.find((r) => clampedBmi >= r.min && clampedBmi <= r.max)
//     const rangeBmi = clampedBmi - range.min
//     const rangePercentage =
//       (rangeBmi / (range.max - range.min)) * (range.end - range.start)
//     const position = range.start + rangePercentage

//     return `${position}%`
//   }

//   return (
//     <>
//       <div className="auth-register-info-body-title">
//         신체 정보를 알려주세요
//       </div>
//       <form className="auth-register-info-body-form-container">
//         <div className="auth-register-info-body-input-container">
//           <div className="auth-register-info-body-input-item">
//             <div className="auth-register-info-body-input-item-title">
//               키 (cm)
//             </div>
//             <div className="auth-register-info-body-input-item-container">
//               <input
//                 type="text"
//                 name="height"
//                 value={localUserInfo.height}
//                 pattern="[0-9]*"
//                 onChange={handleHeightChange}
//               />
//               <p>cm</p>
//             </div>
//           </div>
//           <div className="auth-register-info-body-input-item">
//             <div className="auth-register-info-body-input-item-title">
//               몸무게 (kg)
//             </div>
//             <div className="auth-register-info-body-input-item-container">
//               <input
//                 type="text"
//                 name="weight"
//                 value={localUserInfo.weight}
//                 pattern="[0-9]*"
//                 onChange={handleWeightChange}
//               />
//               <p>kg</p>
//             </div>
//           </div>
//         </div>
//       </form>
//       <div className="auth-register-info-body-bmi-container">
//         <div className="auth-register-info-body-bmi-text-container">
//           <h1 className="auth-register-info-body-bmi-title">
//             나의 체질량 지수 (BMI)
//           </h1>
//           <div
//             className={`auth-register-info-body-bmi-state ${
//               localUserInfo.bmi < 18.5
//                 ? "underweight"
//                 : localUserInfo.bmi < 24.9
//                 ? "normal"
//                 : localUserInfo.bmi < 29.9
//                 ? "overweight"
//                 : localUserInfo.bmi < 34.9
//                 ? "obesity"
//                 : "severe-obesity"
//             }`}
//           >
//             {localUserInfo.bmi < 18.5
//               ? "저체중"
//               : localUserInfo.bmi < 24.9
//               ? "정상"
//               : localUserInfo.bmi < 29.9
//               ? "과체중"
//               : localUserInfo.bmi < 34.9
//               ? "비만"
//               : "고도비만"}
//             <span className="auth-register-info-body-bmi-state-shame">
//               {localUserInfo.bmi}
//             </span>
//           </div>
//         </div>
//         <div className="auth-register-info-body-bmi-bar">
//           <div
//             className="auth-register-info-body-bmi-indicator"
//             style={{ left: calculateIndicatorPosition() }}
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// export default InfoStepTwo

import React, { useEffect, useState } from "react"

const InfoStepTwo = ({ userInfo, setUserInfo }) => {
  const [localUserInfo, setLocalUserInfo] = useState(userInfo)

  useEffect(() => {
    if (localUserInfo.height && localUserInfo.weight) {
      const heightInMeters = localUserInfo.height / 100
      const calculatedBmi = (
        localUserInfo.weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1)
      if (calculatedBmi !== localUserInfo.bmi) {
        setLocalUserInfo((prevState) => ({
          ...prevState,
          bmi: calculatedBmi,
        }))
      }
    }
  }, [localUserInfo.height, localUserInfo.weight])

  useEffect(() => {
    setUserInfo(localUserInfo)
  }, [localUserInfo])

  const handleHeightChange = (e) => {
    const { value } = e.target
    if (/^\d*$/.test(value)) {
      setLocalUserInfo((prevState) => ({
        ...prevState,
        height: value,
      }))
    }
  }

  const handleWeightChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setLocalUserInfo((prevState) => ({
        ...prevState,
        weight: value,
      }))
    }
  }

  const calculateIndicatorPosition = () => {
    if (!localUserInfo.bmi) return "0%"

    const minBmi = 10
    const maxBmi = 40
    const clampedBmi = Math.max(minBmi, Math.min(localUserInfo.bmi, maxBmi))

    const ranges = [
      { min: 10, max: 18.5, start: 0, end: 20 },
      { min: 18.5, max: 24.9, start: 20, end: 40 },
      { min: 24.9, max: 29.9, start: 40, end: 60 },
      { min: 29.9, max: 34.9, start: 60, end: 80 },
      { min: 34.9, max: 40, start: 80, end: 100 },
    ]

    const range = ranges.find((r) => clampedBmi >= r.min && clampedBmi <= r.max)
    const rangeBmi = clampedBmi - range.min
    const rangePercentage =
      (rangeBmi / (range.max - range.min)) * (range.end - range.start)
    const position = range.start + rangePercentage

    return `${position}%`
  }

  return (
    <>
      <div className="auth-register-info-body-title">
        신체 정보를 알려주세요
      </div>
      <form className="auth-register-info-body-form-container">
        <div className="auth-register-info-body-input-container">
          <div className="auth-register-info-body-input-item">
            <div className="auth-register-info-body-input-item-title">
              키 (cm)
            </div>
            <div className="auth-register-info-body-input-item-container">
              <input
                type="text"
                name="height"
                value={localUserInfo.height}
                pattern="[0-9]*"
                onChange={handleHeightChange}
              />
              <p>cm</p>
            </div>
          </div>
          <div className="auth-register-info-body-input-item">
            <div className="auth-register-info-body-input-item-title">
              몸무게 (kg)
            </div>
            <div className="auth-register-info-body-input-item-container">
              <input
                type="text"
                name="weight"
                value={localUserInfo.weight}
                pattern="[0-9]*"
                onChange={handleWeightChange}
              />
              <p>kg</p>
            </div>
          </div>
        </div>
      </form>
      <div className="auth-register-info-body-bmi-container">
        <div className="auth-register-info-body-bmi-text-container">
          <h1 className="auth-register-info-body-bmi-title">
            나의 체질량 지수 (BMI)
          </h1>
          <div
            className={`auth-register-info-body-bmi-state ${
              localUserInfo.bmi < 18.5
                ? "underweight"
                : localUserInfo.bmi < 24.9
                ? "normal"
                : localUserInfo.bmi < 29.9
                ? "overweight"
                : localUserInfo.bmi < 34.9
                ? "obesity"
                : "severe-obesity"
            }`}
          >
            {localUserInfo.bmi < 18.5
              ? "저체중"
              : localUserInfo.bmi < 24.9
              ? "정상"
              : localUserInfo.bmi < 29.9
              ? "과체중"
              : localUserInfo.bmi < 34.9
              ? "비만"
              : "고도비만"}
            <span className="auth-register-info-body-bmi-state-shame">
              {localUserInfo.bmi}
            </span>
          </div>
        </div>
        <div className="auth-register-info-body-bmi-bar">
          <div
            className="auth-register-info-body-bmi-indicator"
            style={{ left: calculateIndicatorPosition() }}
          />
        </div>
      </div>
    </>
  )
}

export default InfoStepTwo
