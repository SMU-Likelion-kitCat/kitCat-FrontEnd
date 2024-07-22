import React, { useState } from "react";

const StepThree = ({ nickname, setNickname, nicknames, isFocused, setIsFocused, nextStep }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 12) {
      setNickname(value);
      setIsDuplicate(nicknames.includes(value));
    }
  };

  const isValidNickname = nickname.length > 0 && nickname.length <= 12 && !isDuplicate;

  return (
    <div>
      <h1 className="auth-register-title">
        어떻게 불러드릴까요?
      </h1>
      <div className="auth-register-input-container">
        <input
          className={`auth-register-input ${isFocused ? 'focused' : ''}`}
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="auth-register-char-count">
          {nickname.length}/12
        </div>
        {isDuplicate && (
          <div className="auth-register-error">이미 사용 중인 이름이에요</div>
        )}
      </div>
      <button
        className="auth-register-next-button"
        onClick={nextStep}
        disabled={!isValidNickname}
      >
        다음
      </button>
    </div>
  );
};

export default StepThree;