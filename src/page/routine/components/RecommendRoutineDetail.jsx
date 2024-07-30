import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Recommend from '../dummy/Recommend';

import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { ReactComponent as Calendar_G } from "../../../assets/routine/Calendar_grey.svg";
import { ReactComponent as Clock } from "../../../assets/routine/Clock.svg";
import { ReactComponent as Kcal } from "../../../assets/routine/Kcal.svg";
import { ReactComponent as Ruler } from "../../../assets/routine/Ruler.svg";

const getIconForType = (type) => {
    switch (type) {
        case '시간 목표':
            return <Clock className='detail-icon calendar' />;
        case '칼로리 목표':
            return <Kcal className='detail-icon calendar' />;
        case '산책 거리 목표':
            return <Ruler className='detail-icon calendar' />;
        default:
            return <Clock className='detail-icon calendar' />; // Default to Clock if type is unknown
    }
};

const RecommendRoutineDetail = () => {
    const { id } = useParams();
    const routine = Recommend.find(r => r.id === parseInt(id));
    const [backgroundColor, setBackgroundColor] = useState('');

    const navigate = useNavigate();

    const handleClick_Back = () => {
        navigate('../recommend');
    };

    const handleClick_Add = () => {
        navigate('../../routine/ongoing');
    };

    useEffect(() => {
        const colors = ['#F8DEDE', '#FCF1DB', '#ECFAE0', '#E1F0FB', '#F1EBF9', '#FFEAF4'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, []);

    const generateWeeklyGoals = (duration_int, goal, step) => {
        const weeklyGoals = [];
        let currentGoal = goal - (duration_int - 1) * step;

        for (let i = 0; i < duration_int; i++) {
            weeklyGoals.push(currentGoal);
            currentGoal += step;
        }

        return weeklyGoals;
    };

    if (!routine) {
        return <div>루틴을 찾을 수 없습니다.</div>;
    }

    const weeklyGoals = generateWeeklyGoals(routine.duration_int, routine.goal, routine.step);

    // Function to determine unit display based on routine type
    const getUnitDisplay = (type) => {
        switch (type) {
            case '시간 목표':
                return '분';
            case '칼로리 목표':
                return 'kcal';
            case '산책 거리 목표':
                return 'm';
            default:
                return '단위';
        }
    };

    return (
        <div className="routine-detail-container">
            <div className="routine-detail-container-main" style={{ background: backgroundColor }}>
                <div className="routine-detail-header">
                    <BackArrow className='routine-detail-back-button' onClick={handleClick_Back} />
                </div>
                <div className='title-wrap'>
                    <h1 className='routine-detail-title'>
                        {routine.title}
                    </h1>
                </div>
                <h1 className='routine-detail-subtitle'>
                    {routine.type}를 달성하는 방식
                </h1>
            </div>
            <div className="routine-detail-container-main">
                <div className='routine-detail-info-wrap'>
                    <Calendar_G className='detail-icon calendar' />
                    <h1 className='detail-info'>
                        {routine.duration} · {routine.unit}에 {routine.amount}번
                    </h1>
                </div>
                <div className='routine-detail-info-wrap'>
                    {getIconForType(routine.type)}
                    <h1 className='detail-info'>
                        {routine.goal}{getUnitDisplay(routine.type)} 목표
                    </h1>
                </div>
                <div className='routine-detail-week-wrap'>
                    <h1 className='detail-week-title'>
                        매주 {routine.step}분씩 더 산책해요
                    </h1>
                    {weeklyGoals.map((goal, index) => (
                        <div key={index} className='detail-generation-wrap'>
                            <p className="detail-week-index">{index + 1}주</p>
                            <p className='detail-week-info'>{goal}{getUnitDisplay(routine.type)} 산책</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className='add-routine-button' onClick={handleClick_Add}>루틴 추가하기</button>
        </div>
    );
};

export default RecommendRoutineDetail;
