// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const MyBody = () => {
//   const navigate = useNavigate();
//   const name = "김은진";
//   const bmi = "20.9";
//   const bmiState = "정상";
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");

//   const handleHeightChange = (event) => {
//     const value = event.target.value;
//     if (/^\d*$/.test(value)) {
//       setHeight(value);
//     }
//   };

//   const handleWeightChange = (event) => {
//     const value = event.target.value;
//     if (/^\d*$/.test(value)) {
//       setWeight(value);
//     }
//   };

//   return (
//     <div className="mybody-container">
//       <div className="mybody-title">
//         <span className="name">{name} </span> 님의 <br />
//         신체 정보를 알려주세요
//       </div>
//       <form>
//         <div className="input-container">
//           <div className="height-text">키 (cm)</div>
//           <input
//             type="text"
//             value={height}
//             pattern="[0-9]*"
//             onChange={handleHeightChange}
//           />
//           <div className="fixed-text">cm</div>
//         </div>
//         <div className="input-container">
//           <div className="weight-text">몸무게 (kg)</div>
//           <input
//             type="text"
//             value={weight}
//             pattern="[0-9]*"
//             onChange={handleWeightChange}
//           />
//           <div className="fixed-text">kg</div>
//         </div>
//       </form>
//       <div className="bmi-container">
//         <div className="bmi-text">나의 체질량 지수 (BMI)</div>
//         <div className="bmi-state">
//           {bmiState} <span className="bmi-shame">{bmi}</span>
//         </div>
//       </div>
//       <button
//         className="mybody-next-button"
//         onClick={() => navigate("/mypage/pet")}
//       >
//         다음
//       </button>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBody = () => {
  const navigate = useNavigate();
  const name = "김은진";
  const bmi = "20.9";
  const bmiState = "정상";

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleHeightChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setHeight(value);
    }
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setWeight(value);
    }
  };

  return (
    <div className="mybody-container">
      <div className="mybody-title">
        <span className="name">{name}</span> 님의 <br />
        신체 정보를 알려주세요
      </div>
      <form className="form-wrapper">
        <div className="input-text-container">
          <div className="height-text">키 (cm)</div>
          <div className="weight-text">몸무게 (kg)</div>
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={height}
              pattern="[0-9]*"
              onChange={handleHeightChange}
            />
            <div className="fixed-text">cm</div>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={weight}
              pattern="[0-9]*"
              onChange={handleWeightChange}
            />
            <div className="fixed-text">kg</div>
          </div>
        </div>
      </form>
      <div className="bmi-container">
        <div className="bmi-text">나의 체질량 지수 (BMI)</div>
        <div className="bmi-state">
          {bmiState} <span className="bmi-shame">{bmi}</span>
        </div>
        <div></div>
      </div>
      <button
        className="mybody-next-button"
        onClick={() => navigate("/mypage/pet")}
      >
        다음
      </button>
    </div>
  );
};

export default MyBody;
