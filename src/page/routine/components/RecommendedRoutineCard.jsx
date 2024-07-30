import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendedRoutineCard = ({ id, title, description }) => {

    const navigate = useNavigate();
    const handleRRClick = () => {
        console.log("Navigating to ID:", id);
        navigate(`/routine/recommend/${id}`);
    };
    return (
        <div className="recommended-routine-card" onClick={handleRRClick}>
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="add-button">추가하기</button>
        </div>
    );
};

export default RecommendedRoutineCard;