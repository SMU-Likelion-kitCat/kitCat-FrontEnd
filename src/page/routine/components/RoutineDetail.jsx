// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Ongoing from '../dummy/Ongoing';

// import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
// import { ReactComponent as Edit } from "../../../assets/routine/Edit.svg";
// import { ReactComponent as Trash } from "../../../assets/routine/Trash.svg";
// import { ReactComponent as Calendar_G } from "../../../assets/routine/Calendar_grey.svg";
// import { ReactComponent as Clock } from "../../../assets/routine/Clock.svg";
// import { ReactComponent as DropBoxArrow } from "../../../assets/routine/DropBoxArrow.svg";
// import { ReactComponent as Kcal } from "../../../assets/routine/Kcal.svg";
// import { ReactComponent as Ruler } from "../../../assets/routine/Ruler.svg";
// import { ReactComponent as GreenBox } from "../../../assets/routine/GreenBox.svg";
// import { ReactComponent as GreyBox } from "../../../assets/routine/GreyBox.svg";
// import { ReactComponent as GreenPaw } from "../../../assets/routine/GreenPaw.svg";
// import DeleteModal from './DeleteModal';

// const getProgressColor = (progress) => {
//     if (progress <= 40) return '#858585';
//     if (progress <= 70) return '#D2A44B';
//     return '#1E76DE';
// };

// const getIconForType = (type) => {
//     switch (type) {
//         case '시간 목표':
//             return <Clock className='detail-icon calendar' />;
//         case '칼로리 목표':
//             return <Kcal className='detail-icon calendar' />;
//         case '산책 거리 목표':
//             return <Ruler className='detail-icon calendar' />;
//         default:
//             return <Clock className='detail-icon calendar' />; // Default to Clock if type is unknown
//     }
// };

// const RoutineDetail = () => {
//     const { id } = useParams();
//     const routine = Ongoing.find(r => r.id === parseInt(id));
//     const [openIndex, setOpenIndex] = useState(null);
//     const [showModal, setShowModal] = useState(false); // State to control modal visibility

//     const navigate = useNavigate();

//     const handleClick_Back = () => {
//         navigate('../ongoing');
//     };

//     const generateWeeklyGoals = (duration_int, goal, step) => {
//         const weeklyGoals = [];
//         let currentGoal = goal - (duration_int - 1) * step;

//         for (let i = 0; i < duration_int; i++) {
//             weeklyGoals.push(currentGoal);
//             currentGoal += step;
//         }

//         return weeklyGoals;
//     };

//     if (!routine) {
//         return <div>루틴을 찾을 수 없습니다.</div>;
//     }

//     const weeklyGoals = generateWeeklyGoals(routine.duration_int, routine.goal, routine.step);

//     const toggleRecordVisibility = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     const handleTrashClick = () => {
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     const handleConfirmDelete = () => {
//         // Implement the deletion logic here
//         console.log(`Routine with id ${id} deleted`);
//         navigate('../ongoing');
//     };

//     const handleEditClick = () => {
//         navigate('./edit', { state: { routine } });
//     };

//     // Function to determine unit display based on routine type
//     const getUnitDisplay = (type) => {
//         switch (type) {
//             case '시간 목표':
//                 return '분';
//             case '칼로리 목표':
//                 return 'kcal';
//             case '산책 거리 목표':
//                 return 'm';
//             default:
//                 return '단위';
//         }
//     };

//     // Function to render weekly progress icons
//     const renderWeeklyProgress = () => {
//         const weeks = [];
//         for (let i = 0; i < routine.duration_int; i++) {
//             const week = i + 1;
//             const records = routine.records.find(record => record.week === week);
//             const meetsAmount = records && records.entries.length >= routine.amount;
//             const meetsGoal = records && records.entries.some(entry => entry.recordgoal >= weeklyGoals[i]);

//             let icon;
//             if (records) {
//                 if (meetsAmount && meetsGoal) {
//                     icon = <GreenPaw key={week} className='week-icon' />;
//                 } else {
//                     icon = <GreenBox key={week} className='week-icon' />;
//                 }
//             } else {
//                 icon = <GreyBox key={week} className='week-icon' />;
//             }

//             weeks.push(
//                 <div className="week-container" key={week}>
//                     <div className="week-label">{`${week}주`}</div>
//                     {icon}
//                 </div>
//             );
//         }
//         return weeks;
//     };

//     return (
//         <div className="routine-detail-container">
//             <div className="routine-detail-container-main" style={{ background: routine.progress >= 100 ? '#F8F8F8' : routine.highlight }}>
//                 <div className="routine-detail-header">
//                     <BackArrow className='routine-detail-back-button' onClick={handleClick_Back} />
//                     <div className='icon-container'>
//                         <Edit className='routine-detail-icon' onClick={handleEditClick} />
//                         <Trash className="routine-detail-icon" onClick={handleTrashClick} /> {/* Update to show modal */}
//                     </div>
//                 </div>
//                 <div className='title-wrap'>
//                     <h1 className='routine-detail-title progress' style={{ color: routine.progress >= 100 ? '#8F8F8F' : getProgressColor(routine.progress) }}>
//                         {routine.progress >= 100 ? '완료' : `${routine.progress}%`}
//                     </h1>
//                     <h1 className='routine-detail-title'>
//                         {routine.title}
//                     </h1>
//                 </div>
//                 <h1 className='routine-detail-subtitle'>
//                     {routine.type}를 달성하는 방식
//                 </h1>
//             </div>
//             <div className="routine-detail-container-main">
//                 <div className='routine-detail-info-wrap'>
//                     <Calendar_G className='detail-icon calendar' />
//                     <h1 className='detail-info'>
//                         {routine.duration} · {routine.unit}에 {routine.amount}번
//                     </h1>
//                 </div>
//                 <div className='routine-detail-info-wrap'>
//                     {getIconForType(routine.type)}
//                     <h1 className='detail-info'>
//                         {routine.goal}{getUnitDisplay(routine.type)} 목표
//                     </h1>
//                 </div>
//                 <div className='routine-detail-week-wrap'>
//                     <h1 className='detail-week-title'>
//                         매주 {routine.step}분씩 더 산책해요
//                     </h1>
//                     {weeklyGoals.map((goal, index) => (
//                         <div key={index} className='detail-generation-wrap'>
//                             <p className="detail-week-index">{index + 1}주</p>
//                             <p className='detail-week-info'>{goal}{getUnitDisplay(routine.type)} 산책</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <hr className='routine-detail-container-main two' />
//             <div className="routine-detail-container-main">
//                 <div className='routine-detail-week-wrap record'>
//                     <h1 className='detail-week-title'>
//                         내 루틴 기록
//                     </h1>
//                 </div>
//                 <div className='detail-record-progress'>
//                     {renderWeeklyProgress()}
//                 </div>
//                 {routine.records.map((record, index) => (
//                     <div key={index} className='detail-weeks-record'>
//                         <div className='detail-weeks-record-header' onClick={() => toggleRecordVisibility(index)}>
//                             <h1 className='detail-weeks-record-title'>
//                                 {record.week}주
//                             </h1>
//                             <DropBoxArrow className={`detail-weeks-record-icon ${openIndex === index ? 'open' : ''}`} />
//                         </div>
//                         {openIndex === index && (
//                             <div className='detail-weeks-record-content'>
//                                 {record.entries.map((entry, entryIndex) => (
//                                     <div key={entryIndex} className='detail-entry'>
//                                         <p className='entry-date'>{entry.date}</p>
//                                         <p className='entry-endtime'>{entry.endtime}</p>
//                                         <p className={`entry-recordgoal ${entry.recordgoal >= weeklyGoals[record.week - 1] ? 'achieved' : ''}`}>
//                                             {entry.recordgoal}{getUnitDisplay(routine.type)} 산책
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <DeleteModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} /> {/* Add Modal component */}
//         </div>
//     );
// };

// export default RoutineDetail;

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRoutineDetail } from "../../../api"
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

  useEffect(() => {
    const fetchRoutineDetail = async () => {
      try {
        const res = await getRoutineDetail(id)
        console.log("들어온 루틴 디테일", res)
        setRoutine(res)
      } catch (error) {
        console.error("Failed to fetch routine detail:", error)
      }
    }

    fetchRoutineDetail()
  }, [id])

  const handleClick_Back = () => {
    navigate("../ongoing")
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
    routine.duration_int,
    routine.goal,
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
    // Implement the deletion logic here
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
    for (let i = 0; i < routine.duration_int; i++) {
      const week = i + 1
      const records = routine.records.find((record) => record.week === week)
      const meetsAmount = records && records.entries.length >= routine.amount
      const meetsGoal =
        records &&
        records.entries.some((entry) => entry.recordgoal >= weeklyGoals[i])

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
          background: routine.progress >= 100 ? "#F8F8F8" : routine.highlight,
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
          <h1 className="routine-detail-title">{routine.title}</h1>
        </div>
        <h1 className="routine-detail-subtitle">
          {routine.type}를 달성하는 방식
        </h1>
      </div>
      <div className="routine-detail-container-main">
        <div className="routine-detail-info-wrap">
          <Calendar_G className="detail-icon calendar" />
          <h1 className="detail-info">
            {routine.duration} · {routine.unit}에 {routine.amount}번
          </h1>
        </div>
        <div className="routine-detail-info-wrap">
          {getIconForType(routine.type)}
          <h1 className="detail-info">
            {routine.goal}
            {getUnitDisplay(routine.type)} 목표
          </h1>
        </div>
        <div className="routine-detail-week-wrap">
          <h1 className="detail-week-title">
            매주 {routine.step}분씩 더 산책해요
          </h1>
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="detail-generation-wrap">
              <p className="detail-week-index">{index + 1}주</p>
              <p className="detail-week-info">
                {goal}
                {getUnitDisplay(routine.type)} 산책
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
        {routine.records.map((record, index) => (
          <div key={index} className="detail-weeks-record">
            <div
              className="detail-weeks-record-header"
              onClick={() => toggleRecordVisibility(index)}
            >
              <h1 className="detail-weeks-record-title">{record.week}주</h1>
              <DropBoxArrow
                className={`detail-weeks-record-icon ${
                  openIndex === index ? "open" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <div className="detail-weeks-record-content">
                {record.entries.map((entry, entryIndex) => (
                  <div key={entryIndex} className="detail-entry">
                    <p className="entry-date">{entry.date}</p>
                    <p className="entry-endtime">{entry.endtime}</p>
                    <p
                      className={`entry-recordgoal ${
                        entry.recordgoal >= weeklyGoals[record.week - 1]
                          ? "achieved"
                          : ""
                      }`}
                    >
                      {entry.recordgoal}
                      {getUnitDisplay(routine.type)} 산책
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
