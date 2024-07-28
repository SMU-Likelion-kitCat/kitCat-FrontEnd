import React, { useState, useEffect } from "react"
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import StepOne from "./components/StepOne"
import StepTwo from "./components/StepTwo"
import StepThree from "./components/StepThree"
import { Outlet, useNavigate } from "react-router-dom"

const ProgressBar = ({ step }) => {
  const progress = (step / 3) * 100
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  )
}

const Register = () => {
  const [step, setStep] = useState(1)
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    height: 0,
    weight: 0,
    bmi: 0,
    petInfos: [],
  })
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (
      step > 3 &&
      (!signupInfo.email || !signupInfo.password || !signupInfo.nickname)
    ) {
      navigate("/auth/register")
    }
  }, [step, signupInfo, navigate])

  const backStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else if (step === 3) {
      setStep(step + 1)
      navigate("/auth/register/info")
    }
  }

  return (
    <>
      {step <= 3 ? (
        <div className="auth-register-container">
          <BackArrow onClick={backStep} className="auth-register-back-button" />
          <div className="auth-register-progress-container">
            <ProgressBar step={step} />
          </div>
          <div>
            {step === 1 && (
              <StepOne
                email={signupInfo.email}
                setEmail={(email) => setSignupInfo({ ...signupInfo, email })}
                nextStep={nextStep}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
            )}
            {step === 2 && (
              <StepTwo
                password={signupInfo.password}
                setPassword={(password) =>
                  setSignupInfo({ ...signupInfo, password })
                }
                confirmPassword={signupInfo.confirmPassword}
                setConfirmPassword={(confirmPassword) =>
                  setSignupInfo({ ...signupInfo, confirmPassword })
                }
                nextStep={nextStep}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
            )}
            {step === 3 && (
              <StepThree
                nickname={signupInfo.nickname}
                setNickname={(nickname) =>
                  setSignupInfo({ ...signupInfo, nickname })
                }
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                nextStep={nextStep}
              />
            )}
          </div>
        </div>
      ) : (
        <Outlet context={[signupInfo, setSignupInfo]} />
      )}
    </>
  )
}

export default Register
