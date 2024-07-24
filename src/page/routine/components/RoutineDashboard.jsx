import React, { useState } from 'react';
import { ReactComponent as CalendarIcon } from "../../../assets/routine/Calendar.svg";

const RoutineDashboard = () => {
    const [bmi, setBmi] = useState(18.6);

    return (
        <div className="routine-container">
            <div className="routine-container-top">
                <div className="routine-header">
                    <h1 className="routine-title">루틴</h1>
                    <CalendarIcon className="calendar-icon" />
                </div>
                <h1 className="routine-subtitle">
                    00님
                    <br />
                    웰독과....
                </h1>
                <div className="bmi-info">
                    <span>나의 체질량 지수 (BMI)</span>
                    <div>
                        <span className="bmi-score">표준 &nbsp;</span>
                        <span>{bmi}</span>
                    </div>
                </div>
            </div>
            <div className="routine-container-bottom">
                <div className="routine-info">
                    <div className="section-header">
                        <h1 className="routine-subtitle">00님이 현재 진행 중인 루틴이에요</h1>
                        <button className="more-button">더보기</button>
                    </div>
                    <div className="routine-list">
                        {/* Replace this with a map over your routine data */}
                        <div className="routine-card">
                            <div className="highlight-bar"></div>
                            <div className="card-content">
                                <h2>4주 산책 루틴</h2>
                                <p>시간 목표 · 1주 루틴 · 2주에 10번</p>
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: "71%" }}></div>
                                    </div>
                                    <span className="progress-text">
                                        <span className="progress-value">71</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="routine-card">
                            <div className="highlight-bar"></div>
                            <div className="card-content">
                                <h2>4주 산책 루틴</h2>
                                <p>시간 목표 · 1주 루틴 · 2주에 10번</p>
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: "71%" }}></div>
                                    </div>
                                    <span className="progress-text">
                                        <span className="progress-value">71</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="routine-info">
                    <div className="section-header">
                        <h1 className="routine-subtitle">00님에게 추천하는 루틴이에요</h1>
                        <button className="more-button">더보기</button>
                    </div>
                    <div className="routine-list">
                        <div className="recommended-routine-card">
                            <h2>4주 산책 루틴</h2>
                            <p>시간 목표 · 1주 루틴 · 2주에 10번</p>
                            <button className="add-button">추가하기</button>
                        </div>
                        <div className="recommended-routine-card">
                            <h2>4주 산책 루틴</h2>
                            <p>시간 목표 · 1주 루틴 · 2주에 10번</p>
                            <button className="add-button">추가하기</button>
                        </div>
                    </div>
                </div>
                <button className="create-routine-button">+ 나만의 루틴 만들기</button>
            </div>
        </div>
    );
};

export default RoutineDashboard;
