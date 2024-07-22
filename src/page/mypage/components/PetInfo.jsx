import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const MyPet = () => {
  const petName = "반려견";
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={`petinfo-container ${isModalOpen ? "modal-open" : ""}`}>
      <div className="petinfo-title">
        <div className="petinfo-content">
          <span className="pet-name">{petName}</span> 의 <br />
          정보를 알려주세요
        </div>
        <div className="intro-circle"></div>
      </div>

      <form className="pet-wrapper">
        <div className="pet-name-container">
          <div className="pet-name-title">반려견 이름</div>
          <div className="pet-name-input">
            <input type="text" placeholder="반려견 이름 입력" />
          </div>
        </div>
        <div className="pet-weight-container">
          <div className="pet-weight-title">몸무게 (kg)</div>
          <div className="pet-weight-input">
            <input type="text" placeholder="몸무게 (kg) 입력" />
          </div>
        </div>
        <div className="pet-state-container">
          <div className="pet-state-title">반려견 상태</div>
          <button className="pet-state-button" onClick={handleClick}>
            반려견 상태 선택
          </button>
        </div>
      </form>
      <button className="pet-save-button">저장</button>
      <button className="pet-next-button">다음</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>반려견 상태</h2>
            <ul>
              <li onClick={closeModal}>성장기 (4개월 미만)</li>
              <li onClick={closeModal}>성장기 (4~12개월)</li>
              <li onClick={closeModal}>미중성 성견</li>
              <li onClick={closeModal}>중성화 완료 성견</li>
              <li onClick={closeModal}>체중 감량 필요 성견</li>
              <li onClick={closeModal}>체중 증량 필요 성견</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPet;
