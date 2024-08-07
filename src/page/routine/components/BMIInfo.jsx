import React from 'react';

const BMIInfo = ({ bmi }) => {
    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return '저체중';
        if (bmi < 24.9) return '표준';
        if (bmi < 29.9) return '과체중';
        if (bmi < 34.9) return '비만';
        return '고도비만';
    };

    const bmiCategory = getBMICategory(bmi);
    const bmiClass = `bmi-score ${bmiCategory}`;
    const bmiInfoClass = `bmi-info ${bmiCategory}`;

    return (
        <div className={bmiInfoClass}>
            <span>나의 체질량 지수 (BMI)</span>
            <div>
                <span className={bmiClass}>{bmiCategory} &nbsp;</span>
                <span>{bmi}</span>
            </div>
        </div>
    );
};

export default BMIInfo;

