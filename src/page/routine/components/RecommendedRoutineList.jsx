import React, { useEffect } from "react"
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import RoutineList_R from "./RoutineList_R"
import Recommend from "../dummy/Recommend"
import { useNavigate, Outlet } from "react-router-dom"
import { useFooterVisibility } from "../../../layout"
import { useSelectRecommendRoutine } from ".."

const RecommendedRoutineList = () => {
  const navigate = useNavigate()
  const { setShowFooter } = useFooterVisibility()
  const { selectedRoutine } = useSelectRecommendRoutine()

  useEffect(() => {
    setShowFooter(false)

    return () => {
      setShowFooter(true)
    }
  }, [])

  const handleMoreClick_Back = () => {
    navigate("../../routine")
  }

  return (
    <div className="routine-container">
      {selectedRoutine ? (
        <Outlet />
      ) : (
        <div className="routine-container-main">
          <div className="subroutine-header">
            <BackArrow
              onClick={handleMoreClick_Back}
              className="subroutine-back-button"
            />
            <h1 className="subroutine-title">추천 루틴</h1>
          </div>
          <div className="routine-info">
            <RoutineList_R routines={Recommend} viewMode="scroll" />
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendedRoutineList
