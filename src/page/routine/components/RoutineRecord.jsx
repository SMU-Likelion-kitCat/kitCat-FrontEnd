import React, { useState } from 'react';
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { ReactComponent as MonthArrow } from "../../../assets/routine/MonthArrow.svg";
import { useNavigate } from 'react-router-dom';
import Ongoing from '../dummy/Ongoing';

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

const RoutineRecord = () => {
    const navigate = useNavigate();
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(2); // March (0-based index)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoutineData, setSelectedRoutineData] = useState([]);

    const highlightToDotColor = {
        '#F8DEDE': '#EA9393',
        '#FCF1DB': '#EFD194',
        '#ECFAE0': '#C4E8A5',
        '#E1F0FB': '#B9D4E8',
        '#F1EBF9': '#D2C2E8',
        '#FFEAF4': '#EEB4D0'
    };

    const getRoutineData = () => {
        const data = {};
        Ongoing.forEach(routine => {
            routine.records.forEach(record => {
                const highlightsSet = new Set();
                record.entries.forEach(entry => {
                    const [m, d] = entry.date.split('.').map(Number);
                    if (m === month + 1) {
                        if (!data[d]) {
                            data[d] = new Set();
                        }
                        data[d].add(routine.highlight);
                    }
                });
            });
        });

        // Convert Sets to Arrays
        Object.keys(data).forEach(day => {
            data[day] = Array.from(data[day]);
        });

        return data;
    };

    const getRoutineDetailsForDate = (day) => {
        const details = [];
        Ongoing.forEach(routine => {
            routine.records.forEach(record => {
                record.entries.forEach(entry => {
                    const [m, d] = entry.date.split('.').map(Number);
                    if (m === month + 1 && d === day) {
                        details.push({
                            routineName: routine.title,
                            highlight: routine.highlight,
                            type: routine.type,
                            entry
                        });
                    }
                });
            });
        });
        return details;
    };

    const routineData = getRoutineData();

    const handleMoreClick_Back = () => {
        navigate('../../routine');
    };

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const handleDateClick = (day) => {
        const routineDetails = getRoutineDetailsForDate(day);
        setSelectedDate(day);
        setSelectedRoutineData(routineDetails);
    };

    const formatRecordGoal = (type, goal) => {
        switch (type) {
            case '시간 목표':
                return `${goal} 분`;
            case '칼로리 목표':
                return `${goal} kcal`;
            case '산책 거리 목표':
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
            const dayClass = (firstDay + day - 1) % 7 === 0 ? 'sunday' : (firstDay + day - 1) % 7 === 6 ? 'saturday' : '';
            days.push(
                <div className={`routine-calendar-day ${dayClass}`} key={day} onClick={() => handleDateClick(day)}>
                    <div className="routine-calendar-date">{day}</div>
                    <div className="routine-calendar-dots">
                        {routineData[day] && routineData[day].map((highlight, index) => (
                            <div key={index} className="routine-calendar-dot" style={{ backgroundColor: highlightToDotColor[highlight] || highlight }}></div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div>
            <div className='routine-calendar-container'>
                <div className='routine-calendar-header'>
                    <BackArrow onClick={handleMoreClick_Back} className='routine-calendar-back-button' />
                    <h1 className='routine-calendar-title'>루틴 기록</h1>
                </div>
                <div className='routine-calendar'>
                    <div className='routine-calendar-month'>
                        <MonthArrow className='month-nav-button' onClick={handlePrevMonth} />
                        {year}.{(month + 1).toString().padStart(2, '0')}
                        <MonthArrow className='month-nav-button right' onClick={handleNextMonth} />
                    </div>
                    <div className='routine-calendar-day-labels'>
                        {dayLabels.map((label, index) => (
                            <div key={index} className={`routine-calendar-day-label ${index === 0 ? 'sunday' : index === 6 ? 'saturday' : ''}`}>
                                {label}
                            </div>
                        ))}
                    </div>
                    <div className='routine-calendar-grid'>
                        {renderCalendar()}
                    </div>
                </div>
            </div>
            <hr className='boundary' />
            {selectedDate && (
                <div className='routine-details'>
                    <h2>{(month + 1).toString().padStart(2, '0')}.{selectedDate.toString().padStart(2, '0')}</h2>
                    {selectedRoutineData.map((detail, index) => (
                        <div key={index} className='routine-detail-item' style={{ borderLeft: `12px solid ${detail.highlight}` }}>
                            <h3>{detail.routineName}</h3>
                            <p>종료 시간: {detail.entry.endtime}</p>
                            <p>목표 기록: {formatRecordGoal(detail.type, detail.entry.recordgoal)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoutineRecord;
