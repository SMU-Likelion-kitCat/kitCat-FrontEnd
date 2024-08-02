import React, { useState, useEffect } from "react"
import { ReactComponent as MonthArrow } from "../../assets/routine/MonthArrow.svg"
import { ReactComponent as DropBoxArrow } from "../../assets/routine/DropBoxArrow.svg"
import { ReactComponent as DotPlus } from "../../assets/routine/DotPlus.svg"
import { ReactComponent as NoRecordIcon } from "../../assets/routine/NoRecordIcon.svg"

import { fetchWalkRecord } from "../../api"
import RecordKakaoMap from "./components/RecordKakaoMap"
import RecordWalkInfo from "./components/RecordWalkInfo"
import { formatHourMinute } from "../../utils/timeCasting"

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const dayLabels = ["일", "월", "화", "수", "목", "금", "토"]

const Record = () => {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  })
  const [selectedRoutineData, setSelectedRoutineData] = useState([])
  const [showFullMonth, setShowFullMonth] = useState(true)
  const [isArrowRotated, setIsArrowRotated] = useState(true)
  const [walkRecords, setWalkRecords] = useState([])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const records = await fetchWalkRecord(year, month + 1)
        setWalkRecords(records)
        console.log("Fetched walk records data", records)
      } catch (e) {
        console.error(e)
      }
    }

    fetchRecords()
  }, [year, month])

  const handleToggleView = () => {
    setShowFullMonth(!showFullMonth)
    setIsArrowRotated(!isArrowRotated)
  }

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
    const routineDetails = walkRecords[day - 1]?.records || []
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
      const isSelected =
        selectedDate &&
        selectedDate.year === year &&
        selectedDate.month === month &&
        selectedDate.day === day
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
          <div
            className={`record-calendar-date ${isSelected ? "selected" : ""}`}
          >
            {day}
            {isSelected && <div className="highlight-circle selected-circle" />}
          </div>
          <div className="record-calendar-dots">
            {walkRecords[day - 1]?.records?.length > 0 &&
              walkRecords[day - 1].records
                .slice(0, 2)
                .map((_, index) => (
                  <div
                    key={index}
                    className="record-calendar-dot"
                    style={{ backgroundColor: "#00AF50" }}
                  ></div>
                ))}
            {walkRecords[day - 1]?.records?.length > 2 && (
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
      const isSelected =
        selectedDate &&
        selectedDate.year === year &&
        selectedDate.month === month &&
        selectedDate.day === date.getDate()
      const dayClass =
        date.getDay() === 0 ? "sunday" : date.getDay() === 6 ? "saturday" : ""

      days.push(
        <div
          className={`record-calendar-day ${dayClass}`}
          key={date.getDate()}
          onClick={() => handleDateClick(date.getDate())}
        >
          <div
            className={`record-calendar-date ${isSelected ? "selected" : ""}`}
          >
            {date.getDate()}
            {isSelected && <div className="highlight-circle selected-circle" />}
          </div>
          <div className="record-calendar-dots">
            {walkRecords[date.getDate() - 1]?.records?.length > 0 &&
              walkRecords[date.getDate() - 1].records
                .slice(0, 2)
                .map((_, index) => (
                  <div
                    key={index}
                    className="record-calendar-dot"
                    style={{ backgroundColor: "#00AF50" }}
                  ></div>
                ))}
            {walkRecords[date.getDate() - 1]?.records?.length > 2 && (
              <DotPlus className="record-calendar-dot-plus" />
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
    <div className="record-container">
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
        {selectedRoutineData.map((record, index) => (
          <div className="record-tab" key={index}>
            <div className="record-tab-title-wrap">
              <h1 className="record-tab-title">{formatSelectedDate()}</h1>
              <h1 className="record-tab-title time">
                {formatHourMinute(record.endTime)}
              </h1>
            </div>
            <div className="record-tab-map">
              <RecordKakaoMap
                record={record}
                mapId={`${selectedDate.day}-${index}-map`}
              />
            </div>
            <RecordWalkInfo records={record} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Record
