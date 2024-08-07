import React, { useEffect, useState } from "react";
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { ReactComponent as MonthArrow } from "../../../assets/routine/MonthArrow.svg";
import { ReactComponent as DotPlus } from "../../../assets/routine/DotPlus.svg";
import { useNavigate } from "react-router-dom";
import { getRoutineWeekDetail } from "../../../api"; // 수정된 API 경로에 맞게 가져오기

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const RoutineRecord = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-based index
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedRoutineData, setSelectedRoutineData] = useState([]);
  const [routineData, setRoutineData] = useState({});

  useEffect(() => {
    const fetchRoutineRecord = async () => {
      try {
        const res = await getRoutineWeekDetail(year, month + 1); // 1-based month
        console.log("루틴 기록 정보", res);

        const data = {};
        res.forEach((routine, index) => {
          routine.routines.forEach((record) => {
            const date = index + 1;
            if (!data[date]) {
              data[date] = [];
            }
            data[date].push({
              colorCode: record.colorCode,
              routineName: record.name,
              progress: record.progress,
              type: record.routineType,
              recordgoal: record.target,
            });
          });
        });

        setRoutineData(data);
      } catch (error) {
        console.error("루틴 기록 정보 가져오기 실패", error);
      }
    };

    fetchRoutineRecord();
  }, [year, month]);

  const highlightToDotColor = {
    "#F8DEDE": "#EA9393",
    "#FCF1DB": "#EFD194",
    "#ECFAE0": "#C4E8A5",
    "#E1F0FB": "#B9D4E8",
    "#F1EBF9": "#D2C2E8",
    "#FFEAF4": "#EEB4D0",
  };

  const getRoutineWeekDetailsForDate = (day) => {
    return routineData[day] || [];
  };

  const handleMoreClick_Back = () => {
    navigate("../../routine");
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null); // 월을 변경할 때 선택된 날짜 초기화
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null); // 월을 변경할 때 선택된 날짜 초기화
  };

  const handleDateClick = (day) => {
    const routineDetails = getRoutineWeekDetailsForDate(day);
    setSelectedDate(day);
    setSelectedRoutineData(routineDetails);
  };

  const formatRecordGoal = (type, goal) => {
    switch (type) {
      case "시간 목표":
        return `${goal} 분`;
      case "칼로리 목표":
        return `${goal} kcal`;
      case "산책 거리 목표":
        return `${(goal / 1000).toFixed(1)} km`;
      default:
        return goal;
    }
  };

  const renderCalendar = () => {
    const days = [];
    const numDays = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="routine-calendar-day empty" key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= numDays; day++) {
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();
      const dayClass =
        (firstDay + day - 1) % 7 === 0
          ? "sunday"
          : (firstDay + day - 1) % 7 === 6
          ? "saturday"
          : "";

      days.push(
        <div
          className={`routine-calendar-day ${dayClass} ${isToday ? "today" : ""}`}
          key={day}
          onClick={() => handleDateClick(day)}
        >
          <div className="routine-calendar-date">{day}</div>
          <div className="routine-calendar-dots">
            {routineData[day] &&
              routineData[day].slice(0, 2).map((routine, index) => (
                <div
                  key={index}
                  className="routine-calendar-dot"
                  style={{
                    backgroundColor:
                      highlightToDotColor[routine.colorCode] || routine.colorCode,
                  }}
                ></div>
              ))}
            {routineData[day] && routineData[day].length > 2 && (
              <DotPlus className="routine-calendar-dot-plus" />
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="routine-calendar-container">
        <div className="routine-calendar-header">
          <BackArrow
            onClick={handleMoreClick_Back}
            className="routine-calendar-back-button"
          />
          <h1 className="routine-calendar-title">루틴 기록</h1>
        </div>
        <div className="routine-calendar">
          <div className="routine-calendar-month">
            <MonthArrow
              className="month-nav-button"
              onClick={handlePrevMonth}
            />
            {year}.{(month + 1).toString().padStart(2, "0")}
            <MonthArrow
              className="month-nav-button right"
              onClick={handleNextMonth}
            />
          </div>
          <div className="routine-calendar-day-labels">
            {dayLabels.map((label, index) => (
              <div
                key={index}
                className={`routine-calendar-day-label ${
                  index === 0 ? "sunday" : index === 6 ? "saturday" : ""
                }`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="routine-calendar-grid">{renderCalendar()}</div>
        </div>
      </div>
      <hr className="boundary" />
      {selectedDate && (
        <div className="routine-details">
          <h2>
            {(month + 1).toString().padStart(2, "0")}.
            {selectedDate.toString().padStart(2, "0")}
          </h2>
          {selectedRoutineData.map((detail, index) => (
            <div
              key={index}
              className="routine-detail-item"
              style={{ borderLeft: `12px solid ${detail.colorCode}` }}
            >
              <h3>{detail.routineName}</h3>
              <p>루틴 진행도 : {detail.progress}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutineRecord;
