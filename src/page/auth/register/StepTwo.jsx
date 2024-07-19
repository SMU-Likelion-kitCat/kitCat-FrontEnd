import React, { useState } from "react";
import password from '../../../assets/auth/password.svg';
import openpassword from '../../../assets/auth/open_password.svg';
import check from '../../../assets/auth/check.svg';

const StepTwo = ({ passWord, setPassWord, confirmPassword, setConfirmPassword, nextStep, isFocused, setIsFocused }) => {
  const [imageState, setImageState] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const isLength = passWord.length >= 8 && passWord.length <= 15;
  const specialLetter = /[`~!@#$%^&*|\\'\";:\/?]/gi;
  const isSpecial = specialLetter.test(passWord);
  const duplication = /([A-Za-z0-9`~!@#$%^&*(){}[\]-_=+\\|;:'",.<>\/?])\1{3,}/g;
  const isDuplication = duplication.test(passWord);
  const passwordsMatch = passWord === confirmPassword;

  const handlePassWordInput = (e) => {
    setPassWord(e.target.value);
  };

  const handleConfirmInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePassWordImage = () => {
    setImageState(!imageState);
  };

  return (
    <div>
      <h1 className="auth-register-title">
        로그인 때 사용할
        <br />
        비밀번호를 입력해 주세요
      </h1>
      <div className="auth-register-input-container">
        <input
        className={`auth-register-input ${isFocused ? 'focused' : ''}`}
          placeholder='비밀번호 입력'
          type={imageState ? "text" : "password"}
          value={passWord}
          onChange={handlePassWordInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <img
          src={imageState ? openpassword : password}
          className='auth-register-input-icon'
          alt='toggle visibility'
          onClick={handlePassWordImage}
        />
      </div>

      <div className="auth-register-condition-wrap">
        <div className='auth-register-password-condition'>
          <span className={`circle ${isLength ? 'active' : ''}`}>
            {isLength && <img src={check} alt='check' />}
          </span>
          <p className={`${isLength ? 'active' : ''}`}>8자 이상, 15자 이하로 설정해 주세요</p>
        </div>
        <div className='auth-register-password-condition'>
          <span className={`circle ${isSpecial ? 'active' : ''}`}>
            {isSpecial && <img src={check} alt='check' />}
          </span>
          <p className={`${isSpecial ? 'active' : ''}`}>특수 문자를 사용해 주세요</p>
        </div>
        <div className='auth-register-password-condition'>
          <span className={`circle ${!isDuplication && passWord !== '' ? 'active' : ''}`}>
            {!isDuplication && passWord !== '' && <img src={check} alt='check' />}
          </span>
          <p className={`${!isDuplication && passWord !== '' ? 'active' : ''}`}>똑같은 문자가 4번 반복되면 안돼요</p>
        </div>
      </div>


      <div className="auth-register-input-container">
        <input
          placeholder='비밀번호 재입력'
          type={imageState ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmInput}
          onFocus={() => setIsConfirmFocused(true)}
          onBlur={() => setIsConfirmFocused(false)}
          className={`auth-register-input ${isConfirmFocused ? 'focused' : ''}`}
        />
        <img
          src={imageState ? openpassword : password}
          className='auth-register-input-icon'
          alt='toggle visibility'
          onClick={handlePassWordImage}
        />
      </div>
      <div className="auth-register-condition-wrap">
        <div className='auth-register-password-condition'>
          <span className={`circle ${passwordsMatch && confirmPassword !== '' ? 'active' : ''}`}>
            {passwordsMatch && confirmPassword !== '' && <img src={check} alt='check' />}
          </span>
          <p className={`${passwordsMatch && confirmPassword !== '' ? 'active' : ''}`}>비밀번호가 일치합니다</p>
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
  );
};

export default StepTwo;
