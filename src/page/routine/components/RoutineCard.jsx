import React from "react"
import { useNavigate } from "react-router-dom"

const RoutineCard = ({
  id,
  title,
  description,
  progress,
  color,
  highlight,
}) => {
  const getProgressColor = (progress) => {
    if (progress <= 40) return "#858585"
    if (progress <= 70) return "#D2A44B"
    return "#1E76DE"
  }

  const navigate = useNavigate()
  const progressColor = getProgressColor(progress)

  const handleClick = () => {
    console.log("Navigating to ID:", id)
    navigate(`/routine/ongoing/${id}`)
  }

  return (
    <div className="routine-card" onClick={handleClick}>
      <div className="highlight-bar" style={{ backgroundColor: color }}></div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {progress !== undefined && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progressColor,
                }}
              ></div>
            </div>
            <span className="progress-text">
              <span className="progress-value" style={{ color: progressColor }}>
                {progress}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoutineCard
