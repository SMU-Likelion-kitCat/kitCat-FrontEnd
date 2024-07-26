import React from "react"
import { useNavigate } from "react-router-dom"

const InfoNextButton = ({ step, nextStep, petInfos }) => {
  const navigate = useNavigate()
  if (step === 1) {
    return (
      <button
        className="auth-register-info-next-button active"
        onClick={nextStep}
      >
        계속하기
      </button>
    )
  } else if (step === 2) {
    return (
      <button className="auth-register-info-next-button" onClick={nextStep}>
        다음
      </button>
    )
  } else if (step === 3) {
    return (
      <div
        className={`auth-register-info-next-button ${
          petInfos.length > 0 ? "active" : ""
        }`}
        disabled={petInfos.length === 0}
        onClick={() => navigate("/walk")}
      >
        완료
      </div>
    )
  }
}

export default InfoNextButton
