import React, { useState } from "react";
import backbutton from '../../../assets/auth/back.svg';
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const ProgressBar = ({ step }) => {
  const progress = (step / 3) * 100;
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [signupInfo, setSignupInfo] = useState({ email: "", passWord:"", confirmPassword:"",nickname: "" });
  const [isFocused, setIsFocused] = useState(false);
  const [nicknames] = useState(["김은진", "박준형"]); // Example existing nicknames

  const backStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="auth-register-container">
      <img src={backbutton} alt="Back Arrow" className="auth-register-back-button" onClick={backStep} />
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
            passWord={signupInfo.passWord}
            setPassWord={(passWord) => setSignupInfo({ ...signupInfo, passWord })}
            confirmPassword={signupInfo.confirmPassword}
            setConfirmPassword={(confirmPassword) => setSignupInfo({ ...signupInfo, confirmPassword })}
            nextStep={nextStep}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />
        )}
        {step === 3 && (
          <StepThree
            nickname={signupInfo.nickname}
            setNickname={(nickname) => setSignupInfo({ ...signupInfo, nickname })}
            nicknames={nicknames}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            nextStep={nextStep}
          />
        )}
      </div>
    </div>
  );
};

export default Register;