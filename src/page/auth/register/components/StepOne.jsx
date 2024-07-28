import React, { useState } from "react"
import { ReactComponent as Resetbutton } from "../../../../assets/auth/Reset.svg"
import { checkEmail } from "../../../../api" // Import the API function

const StepOne = ({ email, setEmail, nextStep, isFocused, setIsFocused }) => {
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isChecking, setIsChecking] = useState(false)

  const isValidEmail =
    email.includes("@") && (email.includes(".com") || email.includes(".net"))

  const onClickDuplicateCheck = async () => {
    setIsChecking(true)
    try {
      const isAvailable = await checkEmail(email)
      setIsEmailValid(isAvailable)
      if (isAvailable) {
        nextStep()
        console.log("등록 가능")
      }
    } catch (e) {
      if (e.response && e.response.status === 409) {
        console.log(e.response.status, "이메일 중복")
      } else if (e.response && e.response.status === 404) {
        console.log(e.response.status, "엔드포인트 오류")
      }
      setIsEmailValid(false)
    }
    setIsChecking(false)
  }

  return (
    <div>
      <h1 className="auth-register-title">
        로그인에 사용할
        <br />
        아이디를 입력해주세요
      </h1>
      <div className="auth-register-input-container">
        <input
          className={`auth-register-input ${isFocused ? "focused" : ""}`}
          type="email"
          name="email"
          placeholder="아이디 (이메일) 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Resetbutton
          className="auth-register-input-icon"
          onClick={() => setEmail("")}
        />
        {!isValidEmail && email && (
          <div className="auth-register-error">
            올바른 이메일 형식이 아니에요
          </div>
        )}
        {!isEmailValid && !isChecking && (
          <div className="auth-register-error">이메일이 중복되었습니다.</div>
        )}
      </div>
      <button
        className="auth-register-next-button"
        onClick={onClickDuplicateCheck}
        disabled={!isValidEmail || isChecking}
      >
        다음
      </button>
    </div>
  )
}

export default StepOne
