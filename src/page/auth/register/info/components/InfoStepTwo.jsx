import React, { useState, useEffect } from "react"

const InfoStepTwo = ({ nextStep, nickname }) => {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState(null)
  const [bmiState, setBmiState] = useState("")
  const [bmiColorClass, setBmiColorClass] = useState("normal")

  useEffect(() => {
    if (height && weight) {
      const heightInMeters = height / 100
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1)
      setBmi(calculatedBmi)
      if (calculatedBmi < 18.5) {
        setBmiState("저체중")
        setBmiColorClass("underweight")
      } else if (calculatedBmi < 24.9) {
        setBmiState("정상")
        setBmiColorClass("normal")
      } else if (calculatedBmi < 29.9) {
        setBmiState("과체중")
        setBmiColorClass("overweight")
      } else if (calculatedBmi < 34.9) {
        setBmiState("비만")
        setBmiColorClass("obesity")
      } else {
        setBmiState("고도비만")
        setBmiColorClass("severe-obesity")
      }
    }
  }, [height, weight])

  const handleHeightChange = (event) => {
    const value = event.target.value
    if (/^\d*$/.test(value)) {
      setHeight(value)
    }
  }

  const handleWeightChange = (event) => {
    const value = event.target.value
    if (/^\d*$/.test(value)) {
      setWeight(value)
    }
  }

  const calculateIndicatorPosition = () => {
    if (!bmi) return "0%"

    const minBmi = 10
    const maxBmi = 40
    const clampedBmi = Math.max(minBmi, Math.min(bmi, maxBmi))

    // 정확한 위치를 계산하기위한 범위 제한
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
        <span className="auth-register-info-body-title-name">{nickname}</span>{" "}
        님의 <br />
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
                value={height}
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
                value={weight}
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

          <div className={`auth-register-info-body-bmi-state ${bmiColorClass}`}>
            {bmiState}{" "}
            <span className="auth-register-info-body-bmi-state-shame">
              {bmi}
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
      <button className="auth-register-info-next-button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default InfoStepTwo
