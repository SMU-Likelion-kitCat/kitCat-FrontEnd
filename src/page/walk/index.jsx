import { useCallback, useState, useEffect } from "react"
import KakaoMap from "../../components/KakaoMap"
import { useDispatch, useSelector } from "react-redux"
import {
  setTrackingState,
  setTrackingTime,
  setLoadingState,
} from "../../redux/location"
import { useGeoLocation } from "../../hooks/useGeoLocation"
import { startMovement, stopMovement } from "../../utils/movement"
import { useFooterVisibility } from "../../layout"
import StartWalk from "./components/StartWalk"
import StopWalk from "./components/StopWalk"
import { Outlet, useNavigate } from "react-router-dom"
import {
  createWalkRecord,
  getRoutines,
  loginUserInfo,
  petInfo,
} from "../../api"
import { setUserInfo, setPetInfos } from "../../redux/auth"

import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"
import { ReactComponent as CurrentPosition } from "../../assets/walk/CurrentPosition.svg"

const Walk = () => {
  const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
  const [timer, setTimer] = useState("00:00:00") // 타이머 설정
  const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
  const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
  const [selectedDogs, setSelectedDogs] = useState([]) // 산책에 선택한 강아지
  const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
  const [viewRoutines, setViewRoutines] = useState([]) // 현재 진행 중인 루틴을 가져오는 상태

  const [startTime, setStartTime] = useState(null) // 시작 시간 상태 17224 2009 8263 형식
  const [elapsedTime, setElapsedTime] = useState(0)

  const navigate = useNavigate()

  const { error, requestLocation, clearWatcher } = useGeoLocation({
    enableHighAccuracy: false,
    timeout: 1000 * 30,
    maximumAge: 1000 * 3600 * 24,
  })
  const location = useSelector((state) => state.location)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { setShowFooter } = useFooterVisibility()

  // 처음 맵 로딩 시 현재 위치를 가져옴
  useEffect(() => {
    requestLocation()
  }, [])

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000) // 1초, 2초
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0")
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0")
    const seconds = (totalSeconds % 60).toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    let interval

    // 멈춘상태가 아니고 시작시간이 있다면
    if (!isPaused && startTime) {
      console.log("시작 시간", startTime) // 시작한 시간 형식 17224 2009 8263
      interval = setInterval(() => {
        const currentTime = new Date().getTime() // 17224 2009 8263
        console.log("currentTime", currentTime)
        console.log("elapsedTime", elapsedTime) // 0000 일시 정지 시 저장 시간

        const totalElapsed = elapsedTime + (currentTime - startTime)
        // 현재시간에서 시작시간을 빼면 1000 형식
        console.log("totalElapsed", totalElapsed)
        setTimer(formatTime(totalElapsed))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPaused, startTime])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userRes = await loginUserInfo()
        console.log("받아온 userRes 객체", userRes)
        dispatch(
          setUserInfo({
            nickname: userRes.nickname,
            weight: userRes.weight,
            height: userRes.height,
            bmi: userRes.bmi,
          })
        )
      } catch (e) {
        console.error("fetchUserInfo error", e)
      }
    }

    const fetchPetInfo = async () => {
      try {
        const petRes = await petInfo()
        console.log("받아온 petRes 배열", petRes)
        dispatch(setPetInfos(petRes))
        setSelectedDogs(petRes)
      } catch (e) {
        console.error("fetchPetInfo error", e)
      }
    }

    const fetchRoutines = async () => {
      try {
        const routinesRes = await getRoutines()
        console.log("받아온 routinesRes 배열", routinesRes)
        setViewRoutines(routinesRes)
      } catch (e) {
        console.error("fetchRoutines error", e)
      }
    }
    if (
      auth.isLoggedIn === true &&
      (auth.height === 0 ||
        auth.weight === 0 ||
        auth.bmi === 0 ||
        auth.nickname === "")
    ) {
      fetchUserInfo()
    }

    if (auth.isLoggedIn === true && auth.petInfos.length === 0) {
      fetchPetInfo()
    }

    fetchRoutines() // 루틴 정보 가져오기
  }, [auth.isLoggedIn])

  // 로딩 화면 관련 설정
  useEffect(() => {
    if (location.loading && loadingCount > 0) {
      const countdown = setTimeout(() => {
        setLoadingCount((prevCount) => prevCount - 1)
      }, 1000)
      return () => clearTimeout(countdown)
    } else if (location.loading && loadingCount === 0) {
      dispatch(setLoadingState(false))
    }
  }, [location.loading, loadingCount, dispatch])

  const onClickStartTracking = useCallback(() => {
    setIsPaused(false)
    setStartTime(new Date().getTime())
    setElapsedTime(0) // 임시저장 시간
    dispatch(setLoadingState(true))
    requestLocation()
    dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
    startMovement(dispatch, location, selectedDogs, auth)
    setShowFooter(false)
  }, [requestLocation, dispatch, location, setShowFooter, selectedDogs, auth])

  const onClickPauseTracking = () => {
    setIsPaused(true)
    // 정지 버튼을 누른 기준으로 현재시간
    const pauseCurrentTime = new Date().getTime()
    // 멈춘시간을 elapsedTime에 임시저장
    setElapsedTime(
      (prevElapsedTime) => prevElapsedTime + (pauseCurrentTime - startTime)
    )
    dispatch(setTrackingTime(formatTime(elapsedTime))) // 리덕스에도 멈춘시간을 임시저장
    dispatch(setTrackingState({ tracking: true, trackingState: "pause" }))
    stopMovement()
  }

  const onClickRestartTracking = () => {
    setIsPaused(false)
    setStartTime(new Date().getTime())
    dispatch(setTrackingState({ tracking: true, trackingState: "restart" }))
    startMovement(dispatch, location, selectedDogs, auth)
  }

  const onClickStopTracking = async () => {
    const currentTime = new Date().getTime()
    const totalElapseTime = elapsedTime + (currentTime - startTime)
    setElapsedTime(totalElapseTime)
    // setElapsedTime(
    //   (prevElapsedTime) => prevElapsedTime + (currentTime - startTime)
    // )
    stopMovement()
    dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
    clearWatcher()

    // 산책 기록 저장
    const walkRecordData = {
      distance: location.distance,
      walkTime: Math.floor(totalElapseTime / 1000), // 초 단위로 변환
      petRecords: selectedDogs.map((dog) => {
        const dogCalories = location.petCalories.find(
          (calorie) => calorie.petId === dog.id
        )
        return {
          petId: dog.id,
          calorie: dogCalories ? parseFloat(dogCalories.calories) : 0,
        }
      }),
    }

    try {
      const response = await createWalkRecord(walkRecordData)
      console.log("산책 기록 저장 완료", response)
    } catch (e) {
      console.error("산책 기록 저장 실패", e)
    }

    navigate("/walk/result", {
      state: {
        path: location.path,
        distance: location.distance / 1000,
        timer,
        ownerCalories: location.ownerCalories,
        selectedDogs,
        petCalories: location.petCalories,
      },
    })
    console.log("location 객체 확인", location)
  }

  const handleNextDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === selectedDogs.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === 0 ? selectedDogs.length - 1 : prevIndex - 1
    )
  }

  const currentDog = selectedDogs[currentDogIndex]

  const currentDogCalories = location.petCalories.find(
    (calorie) => calorie.petId === currentDog?.id
  )

  const handleDogSelection = (dog) => {
    if (selectedDogs.some((selectedDog) => selectedDog.id === dog.id)) {
      setSelectedDogs(
        selectedDogs.filter((selectedDog) => selectedDog.id !== dog.id)
      )
    } else {
      setSelectedDogs([...selectedDogs, dog])
    }
  }

  if (error) return <div>{error}</div>

  if (location.trackingState === "stop") {
    return <Outlet />
  }

  return (
    <>
      {location.loading ? (
        <div className="walk-start-loading-container">
          <div>{loadingCount}</div>
        </div>
      ) : (
        <div className={`walk-container ${location.tracking ? "active" : ""}`}>
          <div className="walk-map">
            {location.latitude && location.longitude && (
              <KakaoMap
                location={location}
                path={location.path}
                distance={location.distance}
              />
            )}
          </div>

          {location.latitude && location.longitude && (
            <>
              {location.tracking ? (
                <StopWalk
                  onClickStopTracking={onClickStopTracking}
                  onClickPauseTracking={onClickPauseTracking}
                  onClickRestartTracking={onClickRestartTracking}
                  isPaused={isPaused}
                  timer={timer}
                  location={location}
                  selectedDogs={selectedDogs}
                  currentDog={currentDog}
                  currentDogCalories={currentDogCalories}
                  currentDogIndex={currentDogIndex}
                  handleNextDog={handleNextDog}
                  handlePrevDog={handlePrevDog}
                />
              ) : (
                <>
                  {/* <div className="walk-routine-container">
                    {viewRoutines.map((routine, index) => (
                      <div key={index} className="walk-routine-item-container">
                        <div>
                          <div>
                            <h2>진행중인 루틴</h2>
                            <h3>{routine.name}</h3>
                            <p>{routine.description}</p>
                          </div>
                          <div className="walk-routine-item-start-button-container">
                            <div className="walk-routine-item-start-button">
                              <p>시작</p>
                            </div>
                          </div>
                          <div className="walk-routine-item-achieve-percentage-container">
                            <div className="progress-bar">
                              <div
                                className="progress"
                                style={{ width: `${routine.progress || 71}%` }}
                              ></div>
                            </div>
                            <div className="progress-text-container">
                              <span className="progress-text-one">
                                {routine.progress || 71}
                              </span>
                              <span className="progress-text-two">/100</span>
                            </div>
                          </div>
                        </div>

               
                      </div>
                    ))}
                  </div> */}

                  <div className="walk-routine-container">
                    {viewRoutines.map((routine, index) => (
                      <div key={index} className="walk-routine-item-container">
                        <div className="walk-routine-info-container">
                          <div>
                            <h2>진행중인 루틴</h2>
                            <h3>{routine.name}</h3>
                            <p>{routine.description}</p>
                          </div>
                          <div className="walk-routine-item-start-button-container">
                            <div className="walk-routine-item-start-button">
                              <p>시작</p>
                            </div>
                          </div>
                        </div>
                        <div className="walk-routine-item-achieve-percentage-container">
                          <div className="progress-bar">
                            <div
                              className="progress"
                              style={{ width: `${routine.progress || 71}%` }}
                            ></div>
                          </div>
                          <div className="progress-text-container">
                            <span className="progress-text-one">
                              {routine.progress || 71}
                            </span>
                            <span className="progress-text-two">/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="walk-controls-current-position-icon">
                    <CurrentPosition />
                  </div>

                  <StartWalk
                    onClickStartTracking={onClickStartTracking}
                    onShowDogSelection={() => setShowDogSelection(true)}
                    selectedDogs={selectedDogs}
                  />
                </>
              )}
            </>
          )}
        </div>
      )}

      {showDogSelection && (
        <div className="walk-dog-selection-modal">
          <div className="walk-dog-selection-modal-container">
            <h2>강아지를 선택하세요</h2>
            {auth.petInfos.map((dog) => (
              <div key={dog.id} className="walk-dog-selection-item-container">
                <div
                  className={`walk-dog-selection-item ${
                    selectedDogs.some(
                      (selectedDog) => selectedDog.id === dog.id
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleDogSelection(dog)}
                >
                  {selectedDogs.some(
                    (selectedDog) => selectedDog.id === dog.id
                  ) && (
                    <div className="walk-dog-selection-item-icon-container">
                      <CheckDog />
                    </div>
                  )}

                  <img
                    src={`https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/${dog.image}`}
                    alt={dog.name}
                  />
                </div>
                <p className="walk-dog-selection-item-name">{dog.name}</p>
              </div>
            ))}
            <div
              className="walk-dog-selection-modal-close"
              onClick={() => setShowDogSelection(false)}
            >
              <DogModalClose />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Walk
