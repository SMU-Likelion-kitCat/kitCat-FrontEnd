import React, { useEffect, useState } from "react"
import { ReactComponent as CalendarIcon } from "../../../assets/routine/Calender.svg"
import { ReactComponent as Plus } from "../../../assets/routine/Plus.svg"
import RoutineList_O from "./RoutineList_O"
import RoutineList_R from "./RoutineList_R"
import BMIInfo from "./BMIInfo"
import { useNavigate } from "react-router-dom"
import { loginUserInfo, getRoutines } from "../../../api"
import Recommend from "../dummy/Recommend"

const RoutineDashboard = () => {
  const [bmi, setBmi] = useState(0)
  const [viewMode, setViewMode] = useState("slide")
  const [userInfo, setUserInfo] = useState({})
  const [ongoingRoutines, setOngoingRoutines] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await loginUserInfo()
        console.log("유저 정보", res)
        setUserInfo(res)
        setBmi(res.bmi)
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error)
      }
    }

    const fetchRoutines = async () => {
      try {
        const res = await getRoutines()
        console.log("루틴 목록", res)
        setOngoingRoutines(res)
      } catch (error) {
        console.error("루틴 목록 가져오기 실패", error)
      }
    }

    fetchUserInfo()
    fetchRoutines()
  }, [])

  const handleRecordClick = () => {
    navigate("./record")
  }

  const handleAddClick = () => {
    navigate("./create")
  }

  const handleMoreClick_O = () => {
    navigate("./ongoing")
  }
  const handleMoreClick_R = () => {
    navigate("./recommend")
  }

  return (
    <div className="routine-container">
      <div className="routine-container-main">
        <div className="routine-header">
          <h1 className="routine-title">루틴</h1>
          <div className="icon-container">
            <Plus className="routine-icon" onClick={handleAddClick} />
            <CalendarIcon
              className="routine-icon"
              onClick={handleRecordClick}
            />
          </div>
        </div>
        <h1 className="routine-subtitle">
          {userInfo.nickname}님
          <br />
          puppyness와 함께 건강한 루틴을 만들어보세요!
        </h1>
        <BMIInfo bmi={bmi} />
      </div>
      <hr className="routine-container-boundary" />
      <div className="routine-container-main">
        <div className="routine-info">
          <div className="section-header">
            <h1 className="routine-subtitle">
              {userInfo.nickname}님이 현재 진행 중인 루틴이에요
            </h1>
            <button className="more-button" onClick={handleMoreClick_O}>
              더보기
            </button>
          </div>
          <RoutineList_O routines={ongoingRoutines} viewMode={viewMode} />
        </div>
        <div className="routine-info">
          <div className="section-header">
            <h1 className="routine-subtitle">
              {userInfo.nickname}님에게 추천하는 루틴이에요
            </h1>
            <button className="more-button" onClick={handleMoreClick_R}>
              더보기
            </button>
          </div>
          <RoutineList_R routines={Recommend} viewMode={viewMode} />
        </div>
      </div>
    </div>
  )
}

export default RoutineDashboard
