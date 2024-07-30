import React from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../../../../api"
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "../../../../../redux/auth"

const InfoNextButton = ({ step, nextStep, signupInfo }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNextStep = async () => {
    if (step === 5) {
      console.log(signupInfo)
      try {
        const userInfo = {
          nickname: signupInfo.nickname,
          email: signupInfo.email,
          password: signupInfo.password,
          height: signupInfo.height,
          weight: signupInfo.weight,
          bmi: signupInfo.bmi,
        }
        const accessToken = await registerUser(userInfo)
        console.log("회원가입 완료, 토큰:", accessToken)
        dispatch(setToken(accessToken))
        nextStep()
      } catch (e) {
        console.error(e)
      }
    } else if (step === 6) {
      try {
        console.log("펫 등록 완료", signupInfo.petInfos)
        navigate("/walk")
      } catch (e) {
        console.error(e)
      }
    } else {
      nextStep()
    }
  }

  if (step === 4) {
    return (
      <button
        className="auth-register-info-next-button active"
        onClick={nextStep}
      >
        계속하기
      </button>
    )
  } else if (step === 5) {
    return (
      <button
        className="auth-register-info-next-button"
        onClick={handleNextStep}
      >
        다음
      </button>
    )
  } else if (step === 6) {
    return (
      <div
        className={`auth-register-info-next-button ${
          signupInfo.petInfos && signupInfo.petInfos.length > 0 ? "active" : ""
        }`}
        disabled={!signupInfo.petInfos || signupInfo.petInfos.length === 0}
        onClick={handleNextStep}
      >
        완료
      </div>
    )
  }
}

export default InfoNextButton
