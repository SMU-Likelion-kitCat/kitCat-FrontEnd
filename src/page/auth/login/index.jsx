import React, { useState } from "react"
import { ReactComponent as LostArrow } from "../../../assets/auth/LostArrow.svg"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [buttonActive, setButtonActive] = useState(false)
  const buttonActiveState = () => {
    setButtonActive(!buttonActive)
  }

  const navigete = useNavigate()
  return (
    <div className="auth-login-container">
      <div className="auth-login-logo-container">
        <div className="auth-login-logo" />
      </div>
      <h1 className="auth-login-title">
        우리 강아지와 함께
        <br />
        달려보세요!
      </h1>
      <div className="auth-login-input-container">
        <input
          className="auth-login-input"
          type="email"
          name="email"
          placeholder="아이디 (이메일) 입력"
        />
        <input
          className="auth-login-input"
          type="password"
          name="password"
          placeholder="비밀번호 입력"
        />

        <p className="auth-login-lost-p">
          비밀번호를 잊어버리셨나요?
          <div className="auth-login-lost-logo-background">
            <LostArrow />
          </div>
        </p>
      </div>
      <button
        className={`auth-login-button ${buttonActive ? "active" : ""}`}
        onClick={buttonActiveState}
      >
        로그인
      </button>
      <button
        className="auth-login-navigate-register-button"
        onClick={() => navigete("/auth/register")}
      >
        이메일 회원가입
      </button>
    </div>
  )
}

export default Login
