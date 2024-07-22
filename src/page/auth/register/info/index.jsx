import React, { useState, useEffect } from "react"
import InfoStepOne from "./components/InfoStepOne"
import InfoStepTwo from "./components/InfoStepTwo"
import InfoStepThree from "./components/InfoStepThree"
import { ReactComponent as BackArrow } from "../../../../assets/auth/register/BackArrow.svg"
import { useNavigate, useOutletContext } from "react-router-dom"

const Info = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const signupInfo = useOutletContext()

  useEffect(() => {
    if (!signupInfo || !signupInfo.email) {
      navigate("/auth/register")
    }
  }, [signupInfo, navigate])

  const backStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // 완료된 이후의 로직 추가
    }
  }

  return (
    <div className="auth-register-info-container">
      <div className="auth-register-info-back-button">
        <BackArrow onClick={backStep} />
      </div>

      <div className="auth-register-info-content-container">
        {step === 1 && (
          <InfoStepOne nickname={signupInfo.nickname} nextStep={nextStep} />
        )}
        {step === 2 && (
          <InfoStepTwo nickname={signupInfo.nickname} nextStep={nextStep} />
        )}
        {step === 3 && <InfoStepThree nextStep={nextStep} />}
      </div>
    </div>
  )
}

export default Info
