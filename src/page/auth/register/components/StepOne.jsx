import React, { useState } from "react"
import { ReactComponent as Resetbutton } from "../../../../assets/auth/Reset.svg"
// import resetbutton from '../../../assets/auth/reset.svg';

const StepOne = ({ email, setEmail, nextStep, isFocused, setIsFocused }) => {
  const isValidEmail =
    email.includes("@") && (email.includes(".com") || email.includes(".net"))

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
        {/* <img
          src={resetbutton}
          alt="Reset"
          className="auth-register-input-icon"
          onClick={() => setEmail("")}
        /> */}
        <Resetbutton
          className="auth-register-input-icon"
          onClick={() => setEmail("")}
        />
        {!isValidEmail && email && (
          <div className="auth-register-error">
            올바른 이메일 형식이 아니에요
          </div>
        )}
      </div>
      <button
        className="auth-register-next-button"
        onClick={nextStep}
        disabled={!isValidEmail}
      >
        다음
      </button>
    </div>
  )
}

export default StepOne
