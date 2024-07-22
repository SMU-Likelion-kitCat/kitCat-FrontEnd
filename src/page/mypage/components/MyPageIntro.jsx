import React from "react";
import { useNavigate } from "react-router-dom";

const MyPageIntro = () => {
  const navigate = useNavigate();
  const name = "김승찬";
  return (
    <div className="mypage-container">
      <h1 className="mypage-title">
        {name}님 만나서 반가워요!
        <br />
        <br />
        웰독의 원활한 이용을 위해
        <br />몇 가지만 여쭤볼게요
      </h1>
      <div className="intro-circle"></div>
      <button
        className="mypage-next-button"
        onClick={() => navigate("/mypage/info")}
      >
        다음
      </button>
    </div>
  );
};

export default MyPageIntro;
