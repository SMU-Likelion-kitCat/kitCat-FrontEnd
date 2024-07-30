import React, { useState } from 'react';
import { ReactComponent as CalendarIcon } from "../../../assets/routine/Calender.svg";
import { ReactComponent as Plus } from "../../../assets/routine/Plus.svg";
import Recommend from '../dummy/Recommend';
import Ongoing from '../dummy/Ongoing';
import RoutineList_O from './RoutineList_O';
import RoutineList_R from './RoutineList_R';
import BMIInfo from './BMIInfo';
import { useNavigate } from 'react-router-dom';

const RoutineDashboard = () => {
    const [bmi, setBmi] = useState(18.6);
    const [viewMode, setViewMode] = useState('slide');
    const navigate = useNavigate();

    const handleRecordClick = () => {
        navigate('./record');
    };

    const handleAddClick = () => {
        navigate('./create');
    };

    const handleMoreClick_O = () => {
        navigate('./ongoing');
    };
    const handleMoreClick_R = () => {
        navigate('./recommend');
    };

    return (
        <div className="routine-container">
            <div className="routine-container-main">
                <div className="routine-header">
                    <h1 className="routine-title">루틴</h1>
                    <div className='icon-container'>
                        <Plus className='routine-icon' onClick={handleAddClick}/>
                        <CalendarIcon className="routine-icon" onClick={handleRecordClick}/>
                    </div>
                </div>
                <h1 className="routine-subtitle">
                    00님
                    <br />
                    웰독과....
                </h1>
                <BMIInfo bmi={bmi} />
            </div>
            <hr className='routine-container-boundary' />
            <div className="routine-container-main">
                <div className="routine-info">
                    <div className="section-header">
                        <h1 className="routine-subtitle">00님이 현재 진행 중인 루틴이에요</h1>
                        <button className="more-button" onClick={handleMoreClick_O}>더보기</button>
                    </div>
                    <RoutineList_O routines={Ongoing} viewMode={viewMode} />
                </div>
                <div className="routine-info">
                    <div className="section-header">
                        <h1 className="routine-subtitle">00님에게 추천하는 루틴이에요</h1>
                        <button className="more-button" onClick={handleMoreClick_R}>더보기</button>
                    </div>
                    <RoutineList_R routines={Recommend} viewMode={viewMode} />
                </div>
            </div>
        </div>
    );
};

export default RoutineDashboard;
