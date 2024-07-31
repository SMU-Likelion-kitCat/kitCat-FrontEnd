// 기록 탭 jsx 파일 - /page/record/index.jsx에 바로 붙혀넣기 하면됩니다.
import React, { useState } from "react"
import { ReactComponent as MonthArrow } from "../../assets/routine/MonthArrow.svg"
import { ReactComponent as DropBoxArrow } from "../../assets/routine/DropBoxArrow.svg"
import { ReactComponent as DotPlus } from "../../assets/routine/DotPlus.svg"
import Ongoing from "../routine/dummy/Ongoing"

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const dayLabels = ["일", "월", "화", "수", "목", "금", "토"]

const Record = () => {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRoutineData, setSelectedRoutineData] = useState([])
  const [showFullMonth, setShowFullMonth] = useState(true)
  const [isArrowRotated, setIsArrowRotated] = useState(true)

  const handleToggleView = () => {
    setShowFullMonth(!showFullMonth)
    setIsArrowRotated(!isArrowRotated) // 아이콘 회전 상태 변경
  }

  const getRoutineData = () => {
    const data = {}
    Ongoing.forEach((routine) => {
      routine.records.forEach((record) => {
        record.entries.forEach((entry) => {
          const [m, d] = entry.date.split(".").map(Number)
          if (m === month + 1) {
            if (!data[d]) {
              data[d] = []
            }
            data[d].push(routine.highlight) // We are no longer grouping by routine, but simply counting entries
          }
        })
      })
    })
    return data
  }

  const getRoutineDetailsForDate = (day) => {
    const details = []
    Ongoing.forEach((routine) => {
      routine.records.forEach((record) => {
        record.entries.forEach((entry) => {
          const [m, d] = entry.date.split(".").map(Number)
          if (m === month + 1 && d === day) {
            details.push({
              routineName: routine.title,
              highlight: routine.highlight,
              type: routine.type,
              entry,
            })
          }
        })
      })
    })
    return details
  }

  const routineData = getRoutineData()

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const handleDateClick = (day) => {
    const routineDetails = getRoutineDetailsForDate(day)
    setSelectedDate({ year, month, day })
    setSelectedRoutineData(routineDetails)
  }

  const formatRecordGoal = (type, goal) => {
    switch (type) {
      case "시간 목표":
        return `${goal} 분`
      case "칼로리 목표":
        return `${goal} kcal`
      case "산책 거리 목표":
        return `${(goal / 1000).toFixed(1)} km`
      default:
        return goal
    }
  }

  const renderCalendar = () => {
    const days = []
    const numDays = daysInMonth(year, month)
    const firstDay = new Date(year, month, 1).getDay()

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div className="record-calendar-day empty" key={`empty-${i}`}></div>
      )
    }

    for (let day = 1; day <= numDays; day++) {
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate()
      const dayClass =
        (firstDay + day - 1) % 7 === 0
          ? "sunday"
          : (firstDay + day - 1) % 7 === 6
          ? "saturday"
          : ""
      days.push(
        <div
          className={`record-calendar-day ${dayClass}`}
          key={day}
          onClick={() => handleDateClick(day)}
        >
          <div className={`record-calendar-date ${isToday ? "today" : ""}`}>
            {isToday && <div className="highlight-circle"></div>}
            {day}
          </div>
          <div className="record-calendar-dots">
            {routineData[day] &&
              routineData[day]
                .slice(0, 2)
                .map((_, index) => (
                  <div
                    key={index}
                    className="record-calendar-dot"
                    style={{ backgroundColor: "#00AF50" }}
                  ></div>
                ))}
            {routineData[day] && routineData[day].length > 2 && (
              <DotPlus className="record-calendar-dot-plus" />
            )}
          </div>
        </div>
      )
    }

    return days
  }

  const renderWeek = () => {
    const days = []
    const today = new Date()
    let startOfWeek

    if (year === today.getFullYear() && month === today.getMonth()) {
      startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
    } else {
      const firstDayOfMonth = new Date(year, month, 1)
      const offset = firstDayOfMonth.getDay()
      startOfWeek = new Date(year, month, 1 - offset)
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      const dayClass =
        date.getDay() === 0 ? "sunday" : date.getDay() === 6 ? "saturday" : ""

      days.push(
        <div
          className={`record-calendar-day ${dayClass}`}
          key={date.getDate()}
          onClick={() => handleDateClick(date.getDate())}
        >
          <div className={`record-calendar-date ${isToday ? "today" : ""}`}>
            {isToday && <div className="highlight-circle"></div>}
            {date.getDate()}
          </div>
          <div className="record-calendar-dots">
            {routineData[date.getDate()] &&
              routineData[date.getDate()]
                .slice(0, 2)
                .map((_, index) => (
                  <div
                    key={index}
                    className="record-calendar-dot"
                    style={{ backgroundColor: "#00AF50" }}
                  ></div>
                ))}
            {routineData[date.getDate()] &&
              routineData[date.getDate()].length > 2 && (
                <div className="record-calendar-dot">+</div>
              )}
          </div>
        </div>
      )
    }

    return days
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return ""
    const date = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day
    )
    const dayOfWeek = dayLabels[date.getDay()]
    return `${selectedDate.year}.${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}.${selectedDate.day
      .toString()
      .padStart(2, "0")} (${dayOfWeek})`
  }

  return (
    <div>
      <div className="record-calendar-container">
        <div className="record-calendar-header">
          <h1 className="record-calendar-title">기록</h1>
        </div>
        <div className="record-calendar">
          <div className="record-calendar-month">
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
          <div className="record-calendar-day-labels">
            {dayLabels.map((label, index) => (
              <div
                key={index}
                className={`record-calendar-day-label ${
                  index === 0 ? "sunday" : index === 6 ? "saturday" : ""
                }`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="record-calendar-grid">
            {showFullMonth ? renderCalendar() : renderWeek()}
          </div>
          <div className="toggle-container">
            <DropBoxArrow
              onClick={handleToggleView}
              className={`record-calendar-toggle-button ${
                isArrowRotated ? "rotated" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <div className="record-calendar-container-sub">
        <div className="record-tab">
          <div className="record-tab-title-wrap">
            <h1 className="record-tab-title">{formatSelectedDate()}</h1>
            <h1 className="record-tab-title time">14:00</h1>
          </div>
          <div className="record-tab-map">여기에 산책 루트 map 들어갈 예정</div>
          <div className="record-tab-info" />
        </div>
        <div className="record-tab">
          <div className="record-tab-title-wrap">
            <h1 className="record-tab-title">{formatSelectedDate()}</h1>
            <h1 className="record-tab-title time">14:00</h1>
          </div>
          <div className="record-tab-map">여기에 산책 루트 map 들어갈 예정</div>
          <div className="record-tab-info" />
        </div>
      </div>
    </div>
  )
}

export default Record
