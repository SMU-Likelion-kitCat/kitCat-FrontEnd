import React, { useState } from 'react';
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import RoutineList_O from './RoutineList_O';
import Ongoing from '../dummy/Ongoing';
import { useNavigate } from 'react-router-dom';

const OngoingRoutineList = () => {
    const navigate = useNavigate();

    const handleMoreClick_Back = () => {
        navigate('../../routine');
    };
    return (
        <div className='routine-container'>
            <div className='routine-container-main'>
                <div className='subroutine-header'>
                    <BackArrow onClick={handleMoreClick_Back} className='subroutine-back-button' />
                    <h1 className='subroutine-title'>진행 중인 루틴</h1>
                </div>
                <div className='routine-info'>
                    <RoutineList_O routines={Ongoing} viewMode='scroll' />
                </div>

            </div>

        </div>
    );
};

export default OngoingRoutineList;