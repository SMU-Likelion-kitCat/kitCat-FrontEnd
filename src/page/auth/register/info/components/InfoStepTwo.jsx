import React, { useState } from "react"

const InfoStepTwo = ({ nextStep, nickname }) => {
  const bmi = "20.9"
  const bmiState = "정상"

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

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
        <h1 className="auth-register-info-body-bmi-title">
          나의 체질량 지수 (BMI)
        </h1>
        <div className="auth-register-info-body-bmi-state">
          {bmiState} <span className="bmi-shame">{bmi}</span>
        </div>
        <div></div>
      </div>
      <button className="auth-register-info-next-button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default InfoStepTwo
