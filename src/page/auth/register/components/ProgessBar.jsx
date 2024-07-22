import React from "react";

const ProgressBar = ({ value, max, color, height, width, className }) => {
  const progress = (value / max) * 100;

  const progressBarStyle = {
    height: height,
    backgroundColor: color,
    width: `${progress}%`,
    transition: "width 0.3s ease-in-out",
  };

  const containerStyle = {
    width: width,
    height: height,
  };

  return (
    <div className={`progress-bar ${className}`} style={containerStyle}>
      <div className="fill" style={progressBarStyle}></div>
    </div>
  );
};

export default ProgressBar;
