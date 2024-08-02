import React, { useState, useEffect } from "react";
import { loginUserInfo, modifyUser, petInfo } from "../../../api";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({});
  const [nickname, setNickname] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      return calculatedBmi;
    }
    return "";
  };

  useEffect(() => {
    setBmi(calculateBMI(height, weight));
  }, [height, weight]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await loginUserInfo();
        console.log("유저 정보", res);
        setUserInfo(res);
        setNickname(res.nickname || "");
        setWeight(res.weight || "");
        setHeight(res.height || "");
        setBmi(calculateBMI(res.height, res.weight));
      } catch (error) {
        console.error("실패", error);
      }
    };

    const fetchPetInfo = async () => {
      try {
        const res = await petInfo();
        console.log("펫 정보", res);
        setPets(res);
      } catch (error) {
        console.error("펫 정보 조회 실패", error);
      }
    };

    fetchUserInfo();
    fetchPetInfo();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleSave = async () => {
    const updatedUser = {
      nickname: nickname,
      weight: Number(weight),
      height: Number(height),
      bmi: Number(bmi)
    };
  
    console.log("Updated User Info:", updatedUser); // Log the user input details
  
    try {
      const res = await modifyUser(updatedUser);
      console.log("업데이트 성공", res);
      navigate("/mypage");
    } catch (error) {
      console.error("업데이트 실패", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const calculateIndicatorPosition = () => {
    if (!bmi) return "0%";

    const minBmi = 10;
    const maxBmi = 40;
    const clampedBmi = Math.max(minBmi, Math.min(bmi, maxBmi));

    const ranges = [
      { min: 10, max: 18.5, start: 0, end: 20 },
      { min: 18.5, max: 24.9, start: 20, end: 40 },
      { min: 24.9, max: 29.9, start: 40, end: 60 },
      { min: 29.9, max: 34.9, start: 60, end: 80 },
      { min: 34.9, max: 40, start: 80, end: 100 },
    ];

    const range = ranges.find(
      (r) => clampedBmi >= r.min && clampedBmi <= r.max
    );
    const rangeBmi = clampedBmi - range.min;
    const rangePercentage =
      (rangeBmi / (range.max - range.min)) * (range.end - range.start);
    const position = range.start + rangePercentage;

    return `${position}%`;
  };

  return (
    <>
      <div className="profile-edit-container">
        <div className="profile-edit-header">
          <h1 className="profile-edit-title">프로필 수정</h1>
          <button onClick={handleSave}>완료</button>
        </div>
        <div className="profile-edit-body">
          <p>이름</p>
          <div className="profile-edit-name-input">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <div className="profile-edit-char-count">{nickname.length}/12</div>
          <form className="profile-form-container">
            <div className="profile-edit-input-container">
              <div className="profile-edit-input-item-container">
                <div className="profile-edit-input-item-title">키 (cm)</div>
                <div className="profile-edit-input-body">
                  <input
                    type="number"
                    name="height"
                    value={height}
                    onChange={handleHeightChange}
                  />
                  <p>cm</p>
                </div>
              </div>
              <div className="profile-edit-input-item-container">
                <div className="profile-edit-input-item-title">몸무게 (kg)</div>
                <div className="profile-edit-input-body">
                  <input
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={handleWeightChange}
                  />
                  <p>kg</p>
                </div>
              </div>
            </div>
          </form>
          <div className="profile-edit-bmi-container">
            <div className="profile-edit-bmi-text-container">
              <h1 className="profile-edit-bmi-title">나의 체질량 지수 (BMI)</h1>
              <div
                className={`profile-edit-bmi-state ${
                  bmi < 18.5
                    ? "underweight"
                    : bmi < 24.9
                    ? "normal"
                    : bmi < 29.9
                    ? "overweight"
                    : bmi < 34.9
                    ? "obesity"
                    : "severe-obesity"
                }`}
              >
                {bmi < 18.5
                  ? "저체중"
                  : bmi < 24.9
                  ? "정상"
                  : bmi < 29.9
                  ? "과체중"
                  : bmi < 34.9
                  ? "비만"
                  : "고도비만"}
                <span className="profile-edit-bmi-state-shame">{bmi}</span>
              </div>
            </div>
            <div className="profile-edit-bmi-bar">
              <div
                className="profile-edit-bmi-indicator"
                style={{ left: calculateIndicatorPosition() }}
              />
            </div>
          </div>
          <div className="profile-edit-pets-container">
            <h2 className="profile-edit-pets-title">내 펫 정보</h2>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <div key={pet.petId} className="profile-edit-pet">
                  <img src={pet.image} alt={pet.name} className="profile-edit-pet-image" />
                  <div className="profile-edit-pet-info">
                    <h3>{pet.name}</h3>
                    <p>{`Weight: ${pet.weight} kg`}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>펫 정보를 불러오는 중...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
