import React, { useState, useEffect } from "react";
import { loginUserInfo } from "../../../api";
import { ReactComponent as PetChange } from "../../../assets/mypage/PetChange.svg";
import { ReactComponent as Bell } from "../../../assets/mypage/Bell.svg";
import { ReactComponent as Notice } from "../../../assets/mypage/Notice.svg";
import { ReactComponent as Person } from "../../../assets/mypage/Person.svg";
import { ReactComponent as More } from "../../../assets/mypage/More.svg";
import { ReactComponent as Next } from "../../../assets/mypage/Next.svg";
import { ReactComponent as QuestionMark } from "../../../assets/mypage/QuestionMark.svg";
import { useNavigate } from "react-router-dom";
const MyPageMain = ({ nickname }) => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await loginUserInfo();
        console.log("유저 정보", res);
        setUserInfo(res);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="mypage-content-container">
        <div className="mypage-content-header">
          <h1 className="mypage-content-title">
            {userInfo.nickname}님
            <br />
            안녕하세요!
          </h1>
          <button
            className="mypage-content-title-button"
            onClick={() => navigate("/mypage/edit")}
          >
            프로필 수정
          </button>
        </div>

        <div className="mypage-content-bmi-container">
          나의 체질량 지수 (BMI)
          <div className="mypage-content-bmi-text">
            표준 <span> {userInfo.bmi}</span>
          </div>
        </div>
        <div className="mypage-content-pet-container">
          <div className="mypage-content-pet-header">
            <div className="mypage-content-pet-text">
              우리 아이 <span>3</span>
            </div>

            <span>
              <PetChange />
            </span>
          </div>
          <div className="mypage-content-pet-body">여기 들어감</div>
        </div>
      </div>
      <hr />

      <ul className="mypage-menu-container">
        <li>
          <p>
            <Person />
            회원 정보 설정
          </p>
          <Next />
        </li>
        <li>
          <p>
            <Bell />
            알림 설정
          </p>
          <Next />
        </li>
        <li>
          <p>
            <Notice />
            공지사항
          </p>
          <Next />
        </li>
        <li>
          <p>
            <QuestionMark />
            자주 묻는 질문
          </p>
          <Next />
        </li>
        <li>
          <p>
            <More />
            약관 및 정책
          </p>

          <Next />
        </li>
      </ul>
    </>
  );
};

export default MyPageMain;
