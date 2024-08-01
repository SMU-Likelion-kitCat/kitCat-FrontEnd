// import React, { useEffect, useState } from "react"
// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
// import RoutineList_R from "./RoutineList_R"
// import Recommend from "../dummy/Recommend"
// import { useNavigate } from "react-router-dom"
// import { useFooterVisibility } from "../../../layout"

// const RecommendedRoutineList = () => {
//   const navigate = useNavigate()
//   const { setShowFooter } = useFooterVisibility()

//   useEffect(() => {
//     setShowFooter(false)

//     return () => {
//       setShowFooter(true)
//     }
//   }, [])

//   const handleMoreClick_Back = () => {
//     navigate("../../routine")
//   }

//   return (
//     <div className="routine-container">
//       <div className="routine-container-main">
//         <div className="subroutine-header">
//           <BackArrow
//             onClick={handleMoreClick_Back}
//             className="subroutine-back-button"
//           />
//           <h1 className="subroutine-title">추천 루틴</h1>
//         </div>
//         <div className="routine-info">
//           <RoutineList_R routines={Recommend} viewMode="scroll" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RecommendedRoutineList

import React, { useEffect, useState } from "react"
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import RoutineList_R from "./RoutineList_R"
import Recommend from "../dummy/Recommend"
import { useNavigate } from "react-router-dom"
import { useFooterVisibility } from "../../../layout"
import { createRoutine } from "../../../api" // API 함수 임포트

const RecommendedRoutineList = () => {
  const navigate = useNavigate()
  const { setShowFooter } = useFooterVisibility()
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  useEffect(() => {
    setShowFooter(false)

    return () => {
      setShowFooter(true)
    }
  }, [])

  const handleMoreClick_Back = () => {
    navigate("../../routine")
  }

  const handleAddRoutine = async (routine) => {
    try {
      const newRoutine = {
        name: routine.name,
        target: routine.target,
        step: routine.step,
        colorCode: routine.colorCode,
        routineType: routine.routineType,
        routineTerm: routine.routineTerm,
        routineBase: routine.routineBase,
        count: routine.count,
      }
      await createRoutine(newRoutine)
      alert("루틴이 성공적으로 추가되었습니다.")
      navigate("../../routine") // 추가 후 루틴 목록 페이지로 리디렉션
    } catch (error) {
      console.error("루틴 추가 실패:", error)
      alert("루틴 추가에 실패했습니다. 다시 시도해 주세요.")
    }
  }

  return (
    <div className="routine-container">
      <div className="routine-container-main">
        <div className="subroutine-header">
          <BackArrow
            onClick={handleMoreClick_Back}
            className="subroutine-back-button"
          />
          <h1 className="subroutine-title">추천 루틴</h1>
        </div>
        <div className="routine-info">
          <RoutineList_R
            routines={Recommend}
            viewMode="scroll"
            onRoutineSelect={setSelectedRoutine} // 루틴 선택 핸들러 추가
          />
        </div>
        {selectedRoutine && (
          <div className="routine-add-container">
            <button
              className="routine-add-button"
              onClick={() => handleAddRoutine(selectedRoutine)}
            >
              이 루틴 추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecommendedRoutineList
