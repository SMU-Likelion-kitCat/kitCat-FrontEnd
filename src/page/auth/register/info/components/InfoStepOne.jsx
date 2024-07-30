import React from "react"
import { ReactComponent as IntroduceImage } from "../../../../../assets/auth/register/IntroduceImage.svg"

const InfoStepOne = ({ nickname }) => {
  return (
    <>
      <h1 className="auth-register-info-content-title">
        {nickname}님 만나서 반가워요!
        <br />
        <br />
        퍼피니스의 원활한 이용을 위해
        <br />몇 가지만 여쭤볼게요
      </h1>
      <div className="auth-register-info-content-logo">
        <IntroduceImage />
      </div>
    </>
  )
}

export default InfoStepOne
