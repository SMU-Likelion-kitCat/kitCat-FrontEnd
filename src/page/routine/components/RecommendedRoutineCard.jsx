import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelectRecommendRoutine } from ".."

const RecommendedRoutineCard = ({ id, title, description, routine }) => {
  const { setSelectedRoutine } = useSelectRecommendRoutine()

  const navigate = useNavigate()

  const handleRRClick = () => {
    console.log("추천 루틴 이동 id", id)
    setSelectedRoutine(routine)
    navigate(`/routine/recommend/${id}`)
  }

  return (
    <div className="recommended-routine-card" onClick={handleRRClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="add-button" onClick={handleRRClick}>
        추가하기
      </button>
    </div>
  )
}

export default RecommendedRoutineCard
