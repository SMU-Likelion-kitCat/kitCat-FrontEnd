// import React, { useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import Ongoing from "../dummy/Ongoing"

// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
// import { ReactComponent as Edit } from "../../../assets/routine/Edit.svg"
// import { ReactComponent as Trash } from "../../../assets/routine/Trash.svg"
// import { ReactComponent as Calendar_G } from "../../../assets/routine/Calendar_grey.svg"
// import { ReactComponent as Clock } from "../../../assets/routine/Clock.svg"
// import { ReactComponent as DropBoxArrow } from "../../../assets/routine/DropBoxArrow.svg"
// import { ReactComponent as Kcal } from "../../../assets/routine/Kcal.svg"
// import { ReactComponent as Ruler } from "../../../assets/routine/Ruler.svg"
// import { ReactComponent as GreenBox } from "../../../assets/routine/GreenBox.svg"
// import { ReactComponent as GreyBox } from "../../../assets/routine/GreyBox.svg"
// import { ReactComponent as GreenPaw } from "../../../assets/routine/GreenPaw.svg"
// import DeleteModal from "./DeleteModal"

// const getProgressColor = (progress) => {
//   if (progress <= 40) return "#858585"
//   if (progress <= 70) return "#D2A44B"
//   return "#1E76DE"
// }

// const getIconForType = (type) => {
//   switch (type) {
//     case "시간 목표":
//       return <Clock className="detail-icon calendar" />
//     case "칼로리 목표":
//       return <Kcal className="detail-icon calendar" />
//     case "산책 거리 목표":
//       return <Ruler className="detail-icon calendar" />
//     default:
//       return <Clock className="detail-icon calendar" /> // Default to Clock if type is unknown
//   }
// }

// const RoutineDetail = () => {
//   const { id } = useParams()
//   const routine = Ongoing.find((r) => r.id === parseInt(id))
//   const [openIndex, setOpenIndex] = useState(null)
//   const [showModal, setShowModal] = useState(false) // State to control modal visibility

//   const navigate = useNavigate()

//   const handleClick_Back = () => {
//     navigate("../ongoing")
//   }

//   const generateWeeklyGoals = (duration_int, goal, step) => {
//     const weeklyGoals = []
//     let currentGoal = goal - (duration_int - 1) * step

//     for (let i = 0; i < duration_int; i++) {
//       weeklyGoals.push(currentGoal)
//       currentGoal += step
//     }

//     return weeklyGoals
//   }

//   if (!routine) {
//     return <div>루틴을 찾을 수 없습니다.</div>
//   }

//   const weeklyGoals = generateWeeklyGoals(
//     routine.duration_int,
//     routine.goal,
//     routine.step
//   )

//   const toggleRecordVisibility = (index) => {
//     setOpenIndex(openIndex === index ? null : index)
//   }

//   const handleTrashClick = () => {
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//   }

//   const handleConfirmDelete = () => {
//     // Implement the deletion logic here
//     console.log(`Routine with id ${id} deleted`)
//     navigate("../ongoing")
//   }

//   const handleEditClick = () => {
//     navigate("./edit", { state: { routine } })
//   }

//   // Function to determine unit display based on routine type
//   const getUnitDisplay = (type) => {
//     switch (type) {
//       case "시간 목표":
//         return "분"
//       case "칼로리 목표":
//         return "kcal"
//       case "산책 거리 목표":
//         return "m"
//       default:
//         return "단위"
//     }
//   }

//   // Function to render weekly progress icons
//   const renderWeeklyProgress = () => {
//     const weeks = []
//     for (let i = 0; i < routine.duration_int; i++) {
//       const week = i + 1
//       const records = routine.records.find((record) => record.week === week)
//       const meetsAmount = records && records.entries.length >= routine.amount
//       const meetsGoal =
//         records &&
//         records.entries.some((entry) => entry.recordgoal >= weeklyGoals[i])

//       let icon
//       if (records) {
//         if (meetsAmount && meetsGoal) {
//           icon = <GreenPaw key={week} className="week-icon" />
//         } else {
//           icon = <GreenBox key={week} className="week-icon" />
//         }
//       } else {
//         icon = <GreyBox key={week} className="week-icon" />
//       }

//       weeks.push(
//         <div className="week-container" key={week}>
//           <div className="week-label">{`${week}주`}</div>
//           {icon}
//         </div>
//       )
//     }
//     return weeks
//   }

//   return (
//     <div className="routine-detail-container">
//       <div
//         className="routine-detail-container-main"
//         style={{
//           background: routine.progress >= 100 ? "#F8F8F8" : routine.highlight,
//         }}
//       >
//         <div className="routine-detail-header">
//           <BackArrow
//             className="routine-detail-back-button"
//             onClick={handleClick_Back}
//           />
//           <div className="icon-container">
//             <Edit className="routine-detail-icon" onClick={handleEditClick} />
//             <Trash
//               className="routine-detail-icon"
//               onClick={handleTrashClick}
//             />{" "}
//             {/* Update to show modal */}
//           </div>
//         </div>
//         <div className="title-wrap">
//           <h1
//             className="routine-detail-title progress"
//             style={{
//               color:
//                 routine.progress >= 100
//                   ? "#8F8F8F"
//                   : getProgressColor(routine.progress),
//             }}
//           >
//             {routine.progress >= 100 ? "완료" : `${routine.progress}%`}
//           </h1>
//           <h1 className="routine-detail-title">{routine.title}</h1>
//         </div>
//         <h1 className="routine-detail-subtitle">
//           {routine.type}를 달성하는 방식
//         </h1>
//       </div>
//       <div className="routine-detail-container-main">
//         <div className="routine-detail-info-wrap">
//           <Calendar_G className="detail-icon calendar" />
//           <h1 className="detail-info">
//             {routine.duration} · {routine.unit}에 {routine.amount}번
//           </h1>
//         </div>
//         <div className="routine-detail-info-wrap">
//           {getIconForType(routine.type)}
//           <h1 className="detail-info">
//             {routine.goal}
//             {getUnitDisplay(routine.type)} 목표
//           </h1>
//         </div>
//         <div className="routine-detail-week-wrap">
//           <h1 className="detail-week-title">
//             매주 {routine.step}분씩 더 산책해요
//           </h1>
//           {weeklyGoals.map((goal, index) => (
//             <div key={index} className="detail-generation-wrap">
//               <p className="detail-week-index">{index + 1}주</p>
//               <p className="detail-week-info">
//                 {goal}
//                 {getUnitDisplay(routine.type)} 산책
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <hr className="routine-detail-container-main two" />
//       <div className="routine-detail-container-main">
//         <div className="routine-detail-week-wrap record">
//           <h1 className="detail-week-title">내 루틴 기록</h1>
//         </div>
//         <div className="detail-record-progress">{renderWeeklyProgress()}</div>
//         {routine.records.map((record, index) => (
//           <div key={index} className="detail-weeks-record">
//             <div
//               className="detail-weeks-record-header"
//               onClick={() => toggleRecordVisibility(index)}
//             >
//               <h1 className="detail-weeks-record-title">{record.week}주</h1>
//               <DropBoxArrow
//                 className={`detail-weeks-record-icon ${
//                   openIndex === index ? "open" : ""
//                 }`}
//               />
//             </div>
//             {openIndex === index && (
//               <div className="detail-weeks-record-content">
//                 {record.entries.map((entry, entryIndex) => (
//                   <div key={entryIndex} className="detail-entry">
//                     <p className="entry-date">{entry.date}</p>
//                     <p className="entry-endtime">{entry.endtime}</p>
//                     <p
//                       className={`entry-recordgoal ${
//                         entry.recordgoal >= weeklyGoals[record.week - 1]
//                           ? "achieved"
//                           : ""
//                       }`}
//                     >
//                       {entry.recordgoal}
//                       {getUnitDisplay(routine.type)} 산책
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <DeleteModal
//         show={showModal}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//       />{" "}
//       {/* Add Modal component */}
//     </div>
//   )
// }

// export default RoutineDetail

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRoutineDetail, getRoutines, fetchWalkRecord } from "../../../api"
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg"
import { ReactComponent as Edit } from "../../../assets/routine/Edit.svg"
import { ReactComponent as Trash } from "../../../assets/routine/Trash.svg"
import { ReactComponent as Calendar_G } from "../../../assets/routine/Calendar_grey.svg"
import { ReactComponent as Clock } from "../../../assets/routine/Clock.svg"
import { ReactComponent as DropBoxArrow } from "../../../assets/routine/DropBoxArrow.svg"
import { ReactComponent as Kcal } from "../../../assets/routine/Kcal.svg"
import { ReactComponent as Ruler } from "../../../assets/routine/Ruler.svg"
import { ReactComponent as GreenBox } from "../../../assets/routine/GreenBox.svg"
import { ReactComponent as GreyBox } from "../../../assets/routine/GreyBox.svg"
import { ReactComponent as GreenPaw } from "../../../assets/routine/GreenPaw.svg"
import DeleteModal from "./DeleteModal"
import { formatDateAndTime } from "../../../utils/timeCasting"
import { useFooterVisibility } from "../../../layout/index"

const getProgressColor = (progress) => {
  if (progress <= 40) return "#858585"
  if (progress <= 70) return "#D2A44B"
  return "#1E76DE"
}

const getIconForType = (type) => {
  switch (type) {
    case "시간 목표":
      return <Clock className="detail-icon calendar" />
    case "칼로리 목표":
      return <Kcal className="detail-icon calendar" />
    case "산책 거리 목표":
      return <Ruler className="detail-icon calendar" />
    default:
      return <Clock className="detail-icon calendar" />
  }
}

const RoutineDetail = () => {
  const { id } = useParams()
  const [routine, setRoutine] = useState(null)
  const [openIndex, setOpenIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()
  const { setShowFooter } = useFooterVisibility()

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const routines = await getRoutines()
        const selectedRoutine = routines.find(
          (routine) => routine.routineId === parseInt(id)
        )

        if (selectedRoutine) {
          const routineDetail = await getRoutineDetail(
            selectedRoutine.routineId
          )
          const walkRecords = await fetchWalkRecord(
            new Date().getFullYear(),
            new Date().getMonth() + 1
          )
          console.log(walkRecords)

          // 모든 api 호출 결과를 하나의 객체로 합침
          setRoutine({
            ...selectedRoutine,
            ...routineDetail,
            records: walkRecords,
          })
        } else {
          console.error("루틴을 찾을 수 없음")
        }
      } catch (error) {
        console.error("routine data 가져오기 오류", error)
      }
    }

    setShowFooter(false)
    fetchRoutineData()
    console.log("id에 맞는 루틴 데이터", routine)

    return () => {
      setShowFooter(true)
    }
  }, [id])

  const handleClick_Back = () => {
    navigate("/routine")
  }

  const generateWeeklyGoals = (duration_int, goal, step) => {
    const weeklyGoals = []
    let currentGoal = goal - (duration_int - 1) * step

    for (let i = 0; i < duration_int; i++) {
      weeklyGoals.push(currentGoal)
      currentGoal += step
    }

    return weeklyGoals
  }

  if (!routine) {
    return <div>Loading...</div>
  }

  const weeklyGoals = generateWeeklyGoals(
    routine.routineTerm,
    routine.target,
    routine.step
  )

  const toggleRecordVisibility = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleTrashClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleConfirmDelete = () => {
    // 나중에 삭제 api 연결 부
    console.log(`Routine with id ${id} deleted`)
    navigate("../ongoing")
  }

  const handleEditClick = () => {
    navigate("./edit", { state: { routine } })
  }

  const getUnitDisplay = (type) => {
    switch (type) {
      case "시간 목표":
        return "분"
      case "칼로리 목표":
        return "kcal"
      case "산책 거리 목표":
        return "m"
      default:
        return "단위"
    }
  }

  const renderWeeklyProgress = () => {
    const weeks = []
    for (let i = 0; i < routine.routineTerm; i++) {
      const week = i + 1
      const records =
        routine.records?.find((record) => record.week === week) || {}
      const meetsAmount = records.entries?.length >= routine.count
      const meetsGoal = records.entries?.some(
        (entry) => entry.recordgoal >= weeklyGoals[i]
      )

      let icon
      if (records) {
        if (meetsAmount && meetsGoal) {
          icon = <GreenPaw key={week} className="week-icon" />
        } else {
          icon = <GreenBox key={week} className="week-icon" />
        }
      } else {
        icon = <GreyBox key={week} className="week-icon" />
      }

      weeks.push(
        <div className="week-container" key={week}>
          <div className="week-label">{`${week}주`}</div>
          {icon}
        </div>
      )
    }
    return weeks
  }

  return (
    <div className="routine-detail-container">
      <div
        className="routine-detail-container-main"
        style={{
          background: routine.progress >= 100 ? "#F8F8F8" : routine.colorCode,
        }}
      >
        <div className="routine-detail-header">
          <BackArrow
            className="routine-detail-back-button"
            onClick={handleClick_Back}
          />
          <div className="icon-container">
            <Edit className="routine-detail-icon" onClick={handleEditClick} />
            <Trash className="routine-detail-icon" onClick={handleTrashClick} />
          </div>
        </div>
        <div className="title-wrap">
          <h1
            className="routine-detail-title progress"
            style={{
              color:
                routine.progress >= 100
                  ? "#8F8F8F"
                  : getProgressColor(routine.progress),
            }}
          >
            {routine.progress >= 100 ? "완료" : `${routine.progress}%`}
          </h1>
          <h1 className="routine-detail-title">
            {routine.routineTerm}주 {routine.name}
          </h1>
        </div>
        <h1 className="routine-detail-subtitle">
          {routine.routineType}를 달성하는 방식
        </h1>
      </div>
      <div className="routine-detail-container-main">
        <div className="routine-detail-info-wrap">
          <Calendar_G className="detail-icon calendar" />
          <h1 className="detail-info">
            {routine.routineTerm}주 · {routine.routineBase}에 {routine.count}번
          </h1>
        </div>
        <div className="routine-detail-info-wrap">
          {getIconForType(routine.routineType)}
          <h1 className="detail-info">
            {routine.target}
            {getUnitDisplay(routine.routineType)} 목표
          </h1>
        </div>
        <div className="routine-detail-week-wrap">
          <h1 className="detail-week-title">
            매주 {routine.step}
            {getUnitDisplay(routine.routineType)}씩 더 {routine.routineType}
          </h1>
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="detail-generation-wrap">
              <p className="detail-week-index">{index + 1}주</p>
              <p className="detail-week-info">
                {goal}
                {getUnitDisplay(routine.routineType)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr className="routine-detail-container-main two" />
      <div className="routine-detail-container-main">
        <div className="routine-detail-week-wrap record">
          <h1 className="detail-week-title">내 루틴 기록</h1>
        </div>
        <div className="detail-record-progress">{renderWeeklyProgress()}</div>
        {[...Array(3)].map((_, weekIndex) => {
          const weekRecords = routine.records
            .slice(weekIndex * 7, (weekIndex + 1) * 7)
            .filter((record) => record.records.length > 0)

          if (weekRecords.length === 0) return null

          return (
            <div key={weekIndex} className="detail-weeks-record">
              <div
                className="detail-weeks-record-header"
                onClick={() => toggleRecordVisibility(weekIndex)}
              >
                <h1 className="detail-weeks-record-title">{weekIndex + 1}주</h1>
                <DropBoxArrow
                  className={`detail-weeks-record-icon ${
                    openIndex === weekIndex ? "open" : ""
                  }`}
                />
              </div>
              {openIndex === weekIndex && (
                <div className="detail-weeks-record-content">
                  {weekRecords.map((entry, entryIndex) => {
                    const { date, time } = formatDateAndTime(
                      entry.records[0].endTime
                    )
                    return (
                      <div key={entryIndex} className="detail-entry">
                        <p className="entry-date">{date}</p>
                        <p className="entry-endtime">{time}</p>
                        <p
                          className={`entry-recordgoal ${
                            entry.records[0].walkTime >=
                            weeklyGoals[Math.floor(weekIndex / 7)]
                              ? "achieved"
                              : ""
                          }`}
                        >
                          {entry.records[0].walkTime}
                          {getUnitDisplay(routine.routineType)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <DeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default RoutineDetail
