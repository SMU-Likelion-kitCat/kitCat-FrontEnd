import React, { useState } from "react"
import { ReactComponent as Password } from "../../../../assets/auth/Password.svg"
import { ReactComponent as OpenPassword } from "../../../../assets/auth/OpenPassword.svg"
import { ReactComponent as Check } from "../../../../assets/auth/Check.svg"

const StepTwo = ({
  password = "",
  setPassword,
  confirmPassword = "",
  setConfirmPassword,
  nextStep,
  isFocused,
  setIsFocused,
}) => {
  const [imageState, setImageState] = useState(false)
  const [isConfirmFocused, setIsConfirmFocused] = useState(false)

  const isLength = password.length >= 8 && password.length <= 15
  const specialLetter = /[`~!@#$%^&*|\\'\";:\/?]/gi
  const isSpecial = specialLetter.test(password)
  const duplication = /([A-Za-z0-9`~!@#$%^&*(){}[\]-_=+\\|;:'",.<>\/?])\1{3,}/g
  const isDuplication = duplication.test(password)
  const passwordsMatch = password === confirmPassword

  const handlePassWordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmInput = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handlePassWordImage = () => {
    setImageState(!imageState)
  }

  return (
    <div>
      <h1 className="auth-register-title">
        로그인 때 사용할
        <br />
        비밀번호를 입력해 주세요
      </h1>
      <div className="auth-register-input-container">
        <input
          className={`auth-register-input ${isFocused ? "focused" : ""}`}
          placeholder="비밀번호 입력"
          type={imageState ? "text" : "password"}
          value={password}
          onChange={handlePassWordInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
        {imageState ? (
          <OpenPassword
            onClick={handlePassWordImage}
            className="auth-register-input-icon"
          />
        ) : (
          <Password
            onClick={handlePassWordImage}
            className="auth-register-input-icon"
          />
        )}
      </div>

      <div className="auth-register-condition-wrap">
        <div className="auth-register-password-condition">
          <span className={`circle ${isLength ? "active" : ""}`}>
            {isLength && <Check />}
          </span>
          <p className={`${isLength ? "active" : ""}`}>
            8자 이상, 15자 이하로 설정해 주세요
          </p>
        </div>
        <div className="auth-register-password-condition">
          <span className={`circle ${isSpecial ? "active" : ""}`}>
            {isSpecial && <Check />}
          </span>
          <p className={`${isSpecial ? "active" : ""}`}>
            특수 문자를 사용해 주세요
          </p>
        </div>
        <div className="auth-register-password-condition">
          <span
            className={`circle ${
              !isDuplication && password !== "" ? "active" : ""
            }`}
          >
            {!isDuplication && password !== "" && <Check />}
          </span>
          <p className={`${!isDuplication && password !== "" ? "active" : ""}`}>
            똑같은 문자가 4번 반복되면 안돼요
          </p>
        </div>
      </div>

      <div className="auth-register-input-container">
        <input
          placeholder="비밀번호 재입력"
          type={imageState ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmInput}
          onFocus={() => setIsConfirmFocused(true)}
          onBlur={() => setIsConfirmFocused(false)}
          className={`auth-register-input ${isConfirmFocused ? "focused" : ""}`}
        />
        {imageState ? (
          <OpenPassword
            onClick={handlePassWordImage}
            className="auth-register-input-icon"
          />
        ) : (
          <Password
            onClick={handlePassWordImage}
            className="auth-register-input-icon"
          />
        )}
      </div>
      <div className="auth-register-condition-wrap">
        <div className="auth-register-password-condition">
          <span
            className={`circle ${
              passwordsMatch && confirmPassword !== "" ? "active" : ""
            }`}
          >
            {passwordsMatch && confirmPassword !== "" && <Check />}
          </span>
          <p
            className={`${
              passwordsMatch && confirmPassword !== "" ? "active" : ""
            }`}
          >
            비밀번호가 일치합니다
          </p>
        </div>
      </div>
      <button
        className="auth-register-next-button"
        onClick={nextStep}
        disabled={!isLength || !isSpecial || isDuplication || !passwordsMatch}
      >
        다음
      </button>
    </div>
  )
}

export default StepTwo
