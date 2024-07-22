import React, { useState } from "react"

const Record = () => {
  const [activeTab, setActiveTab] = useState("month")
  const [selectedMonth, setSelectedMonth] = useState("2024년 7월")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value)
  }

  return (
    <div className="record-container">
      <header className="record-header">
        <div className="header-left">
          <img
            src="profile-placeholder.png"
            alt="Profile"
            className="profile-image"
          />
          <h1>활동</h1>
        </div>
        <button className="add-button">+</button>
      </header>
      <div className="tabs">
        <button
          className={activeTab === "week" ? "active" : ""}
          onClick={() => handleTabChange("week")}
        >
          주
        </button>
        <button
          className={activeTab === "month" ? "active" : ""}
          onClick={() => handleTabChange("month")}
        >
          월
        </button>
        <button
          className={activeTab === "year" ? "active" : ""}
          onClick={() => handleTabChange("year")}
        >
          년
        </button>
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => handleTabChange("all")}
        >
          전체
        </button>
      </div>
      <div className="content">
        <div className="month-selector">
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="2024년 7월">2024년 7월</option>
            <option value="2024년 8월">2024년 8월</option>
          </select>
        </div>
        <div className="stats">
          <div className="stat">
            <h2>0.0</h2>
            <p>킬로미터</p>
          </div>
          <div className="stat">
            <h2>0</h2>
            <p>러닝</p>
          </div>
          <div className="stat">
            <h2>-:--"</h2>
            <p>평균 페이스</p>
          </div>
          <div className="stat">
            <h2>0:00</h2>
            <p>시간</p>
          </div>
        </div>
        <div className="chart">
          <p>차트 영역 (구현 필요)</p>
        </div>
        <div className="recent-activities">
          <h3>최근 활동</h3>
          <div className="activity">
            <img
              src="map-placeholder.png"
              alt="Map"
              className="activity-image"
            />
            <div className="activity-info">
              <p className="activity-date">2023. 10. 13.</p>
              <p className="activity-description">금요일 저녁 러닝</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Record
