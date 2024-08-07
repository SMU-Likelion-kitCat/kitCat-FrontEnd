import React, { useState } from "react"
import { checkNickname } from "../../../../api"

const StepThree = ({
  nickname,
  setNickname,
  isFocused,
  setIsFocused,
  nextStep,
}) => {
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const handleNicknameChange = (e) => {
    const value = e.target.value
    if (value.length <= 12) {
      setNickname(value)
      setIsDuplicate(false)
    }
  }

  const checkDuplicateNickname = async () => {
    setIsChecking(true)
    if (nickname.length > 0 && nickname.length <= 12) {
      try {
        const isAvailable = await checkNickname(nickname)
        setIsDuplicate(!isAvailable)
        console.log("닉네임 중복 확인 완료")
        if (isAvailable) {
          nextStep()
        }
      } catch (e) {
        if (e.response && e.response.status === 409) {
          console.log(e.response.status, "닉네임 중복")
        } else if (e.response && e.response.status === 404) {
          console.log(e.response.status, "엔드포인트 오류")
        } else {
          console.error("닉네임 중복 체크 오류:", e)
        }
      }
    }
    setIsChecking(false)
  }

  const onClickNext = async () => {
    await checkDuplicateNickname()
  }

  const isValidNickname = nickname.length > 0 && nickname.length <= 12

  return (
    <div>
      <h1 className="auth-register-title">어떻게 불러드릴까요?</h1>
      <div className="auth-register-input-container">
        <input
          className={`auth-register-input ${isFocused ? "focused" : ""}`}
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="auth-register-char-count">{nickname.length}/12</div>
        {isDuplicate && !isChecking && (
          <div className="auth-register-error">이미 사용 중인 이름이에요</div>
        )}
      </div>
      <button
        className="auth-register-next-button"
        onClick={onClickNext}
        disabled={!isValidNickname || isChecking}
      >
        다음
      </button>
    </div>
  )
}

export default StepThree
