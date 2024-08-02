import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import KakaoMap from "../../../components/KakaoMap"
import WalkInfo from "../components/WalkInfo"
import { useDispatch, useSelector } from "react-redux"
import { resetLocationState } from "../../../redux/location"
import { getRoutineDetail, getRoutines } from "../../../api"
import { getColorByProgress } from "../../../utils/colorCalculate"
import { ReactComponent as RoutineSuccess } from "../../../assets/walk/RoutineSuccess.svg"
import { useFooterVisibility } from "../../../layout/index"

const Result = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { selectedRoutineId } = location.state || null // Walk 컴포넌트에서 받아오는 루틴 id

  const ReduxLocation = useSelector((state) => state.location)

  const [currentDogIndex, setCurrentDogIndex] = useState(0)
  const [routineSuccess, setRoutineSuccess] = useState(false) // 루틴 성공 여부 상태
  const [routine, setRoutine] = useState(null) // 루틴 상세 정보 상태
  const [weekRecords, setWeekRecords] = useState([])
  const { setShowFooter } = useFooterVisibility()

  useEffect(() => {
    const fetchRoutineDetail = async () => {
      try {
        const res = await getRoutineDetail(selectedRoutineId)
        console.log(res)
        // 가장 최근의 기록이 성공인지 확인합니다.
        const latestRecord = res.weekRecords[0]?.records?.slice(-1)[0]
        if (latestRecord && latestRecord.success) {
          setRoutineSuccess(true)
        }
        setWeekRecords(res.weekRecords[0]?.records || [])
      } catch (e) {
        console.error(e)
      }
    }

    const fetchRoutineList = async () => {
      try {
        const res = await getRoutines()
        console.log(res)
        // selectedRoutineId와 같은 아이디만 뽑아냄
        const matchedRoutine = res.find(
          (routine) => routine.routineId === selectedRoutineId
        )
        setRoutine(matchedRoutine)
      } catch (e) {
        console.error(e)
      }
    }

    fetchRoutineDetail()
    fetchRoutineList()

    return () => setShowFooter(true)
  }, [selectedRoutineId])

  const handleNextDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === ReduxLocation.selectedDogs.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === 0 ? ReduxLocation.selectedDogs.length - 1 : prevIndex - 1
    )
  }

  const currentDog = ReduxLocation.selectedDogs[currentDogIndex]

  const currentDogCalories = ReduxLocation.petCalories.find(
    (calorie) => calorie.petId === currentDog.id
  )

  const formatCalories = (calories) => {
    if (!calories) return "000"
    const formattedCalories = Math.round(calories).toString().padStart(3, "0")
    return formattedCalories
  }

  const formatDate = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"]
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dayName = days[date.getDay()]
    return `${year}.${month}.${day}(${dayName})`
  }

  const getDayStatus = (date) => {
    const today = new Date()
    if (date > today) return "future"
    const recordsForDate = weekRecords.filter(
      (r) => new Date(r.recordTime).toDateString() === date.toDateString()
    )
    return recordsForDate.some((r) => r.success) ? "success" : "fail"
  }

  const renderWeekStatus = () => {
    const days = ["월", "화", "수", "목", "금", "토", "일"]
    const today = new Date()
    return days.map((day, index) => {
      const currentDay = new Date(today)
      currentDay.setDate(today.getDate() - today.getDay() + index + 1) // 월요일부터 시작

      const status = getDayStatus(currentDay)

      return (
        <div key={index} className={`walk-result-routine-week-${status}-icon`}>
          {status === "success" && (
            <div className="walk-result-routine-week-success-icon">
              <RoutineSuccess />
            </div>
          )}
        </div>
      )
    })
  }

  const onClickWalkPate = () => {
    dispatch(resetLocationState())
    console.log("리덕스location 객체 상태 초기화", ReduxLocation)
    navigate("/record")
  }

  const calculateSuccess = () => {
    const uniqueSuccessDays = new Set(
      weekRecords
        .filter((record) => record.success)
        .map((record) => new Date(record.recordTime).toDateString())
    )
    return uniqueSuccessDays.size
  }

  return (
    <div className="walk-result-container">
      <div className="walk-result-title-container">
        <div className="walk-result-title">
          {routineSuccess ? (
            <h2>
              루틴을
              <br /> 성공적으로 완료했어요!
            </h2>
          ) : (
            <h2>
              오늘도
              <br /> 산책을 완료했어요!
            </h2>
          )}
          <p>{formatDate(new Date())}</p>
        </div>
        <div className="walk-result-title-buttom-container">
          <button onClick={onClickWalkPate}>확인</button>
        </div>
      </div>

      {routineSuccess && routine && (
        <div className="walk-result-routine-sucess-container">
          <p>루틴 달성도</p>
          <h3>{routine.routineTerm}주 산책 루틴</h3>
          <div className="walk-routine-item-achieve-percentage-container">
            <div className="walk-routine-item-achieve-progress-bar">
              <div
                className="progress"
                style={{
                  width: `${routine.progress > 100 ? 100 : routine.progress}%`,
                  backgroundColor: getColorByProgress(routine.progress),
                }}
              />
            </div>
            <div className="progress-text-container">
              <span
                className="progress-text-one"
                style={{
                  color: getColorByProgress(routine.progress),
                }}
              >
                {routine.progress}
              </span>
              <span className="progress-text-two">/100</span>
            </div>
          </div>
        </div>
      )}

      <div className="walk-result-map">
        <KakaoMap
          location={ReduxLocation}
          path={ReduxLocation.path}
          readWalkPath={true}
          mapId="result-map"
        />
      </div>

      <WalkInfo
        timer={ReduxLocation.timer}
        distance={ReduxLocation.distance}
        ownerCalories={ReduxLocation.ownerCalories}
        currentDog={currentDog}
        currentDogCalories={currentDogCalories}
        formatCalories={formatCalories}
        selectedDogs={ReduxLocation.selectedDogs}
        currentDogIndex={currentDogIndex}
        handleNextDog={handleNextDog}
        handlePrevDog={handlePrevDog}
        resultPage={true}
      />

      <div className="walk-result-info-share-container">
        <h2>
          산책 후기를
          <br />
          다른 사람들과 공유해 보세요!
        </h2>

        <button onClick={() => navigate("/routine")}>공유</button>
      </div>
      {routineSuccess && routine && (
        <div className="walk-result-routine-week-container">
          <span className="walk-result-routine-week-alert-title">
            이번주는&nbsp;
            <span>{calculateSuccess()}</span> 일동안 루틴을 완료했어요!
          </span>
          <div className="walk-result-routine-week-calendar-container">
            <div className="walk-result-routine-week-calendar-day-title">
              {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            <div>{renderWeekStatus()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Result
