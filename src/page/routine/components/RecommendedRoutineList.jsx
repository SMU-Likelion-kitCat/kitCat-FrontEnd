import React, { useState } from 'react';
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import RoutineList_R from './RoutineList_R';
import Recommend from '../dummy/Recommend';
import { useNavigate } from 'react-router-dom';

const RecommendedRoutineList = () => {
    const navigate = useNavigate();

    const handleMoreClick_Back = () => {
        navigate('../../routine');
    };
    return (
        <div className='routine-container'>
            <div className='routine-container-main'>
                <div className='subroutine-header'>
                    <BackArrow onClick={handleMoreClick_Back} className='subroutine-back-button' />
                    <h1 className='subroutine-title'>추천 루틴</h1>
                </div>
                <div className='routine-info'>
                    <RoutineList_R routines={Recommend} viewMode='scroll' />
                </div>

            </div>

        </div>
    );
};

export default RecommendedRoutineList;