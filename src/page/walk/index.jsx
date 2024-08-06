import { useState, useEffect, useRef } from "react"
import KakaoMap from "../../components/KakaoMap"
import { useDispatch, useSelector } from "react-redux"
import {
  setTrackingState,
  setTrackingTime,
  setLoadingState,
  setTimer,
  setSelectedDogs,
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
import WalkRoutine from "./components/WalkRoutine"
import { convertToSeconds, formatTime } from "../../utils/timeCasting"
import Loading from "../../assets/walk/Loading.gif"

const Walk = () => {
  const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
  const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
  const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
  const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
  const [viewRoutines, setViewRoutines] = useState([]) // 현재 진행 중인 루틴을 가져오는 상태
  const [selectedRoutineId, setSelectedRoutineId] = useState(null) // 현재 진행 중인 루틴 중에서 특정 루틴 아이디를 선택

  const [startTime, setStartTime] = useState(null) // 시작 시간 상태 17224 2009 8263 형식
  const [elapsedTime, setElapsedTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const mapRef = useRef()

  const navigate = useNavigate()

  const { error, requestLocation, clearWatcher } = useGeoLocation({
    enableHighAccuracy: false,
    maximumAge: 60 * 1000 * 5,
    timeout: 60 * 1000 * 3,
  })
  const location = useSelector((state) => state.location)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { setShowFooter } = useFooterVisibility()

  // 처음 맵 로딩 시 현재 위치를 가져옴
  useEffect(() => {
    // 이미 경도 위도가 있으면
    console.log("산책페이지 초기 location 객체", location)
    if (location?.latitude !== null && location?.longitude !== null) {
      setLoading(false)
    } else {
      requestLocation()
      console.log("산책페이지 초기 위치 받아오기 후 location 객체", location)
    }
  }, [location?.latitude, location?.longitude])

  useEffect(() => {
    let interval

    // 멈춘상태가 아니고 시작시간이 있다면
    if (!isPaused && startTime) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime()
        const totalElapsed = elapsedTime + (currentTime - startTime)
        dispatch(setTimer(formatTime(totalElapsed)))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPaused, startTime])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userRes = await loginUserInfo()
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
        dispatch(setPetInfos(petRes))
      } catch (e) {
        console.error("fetchPetInfo error", e)
      }
    }

    const fetchRoutines = async () => {
      try {
        const routinesRes = await getRoutines()
        setViewRoutines(routinesRes)
      } catch (e) {
        console.error("fetchRoutines error", e)
      }
    }
    if (auth.isLoggedIn === true && auth.nickname === "") {
      fetchUserInfo()
    }

    if (auth.isLoggedIn === true && auth.petInfos.length === 0) {
      fetchPetInfo()
    }
    if (auth.isLoggedIn === false) {
      navigate("/auth/login")
    }

    fetchRoutines() // 루틴 정보 가져오기
  }, [auth.isLoggedIn, auth.petInfos.length, auth.nickname])

  // 로딩 화면 관련 설정
  useEffect(() => {
    if (location?.loading && loadingCount > 0) {
      const countdown = setTimeout(() => {
        setLoadingCount((prevCount) => prevCount - 1)
      }, 1000)
      return () => clearTimeout(countdown)
    } else if (location?.loading && loadingCount === 0) {
      dispatch(setLoadingState(false))
    }
  }, [location?.loading, loadingCount])

  const onClickStartTracking = () => {
    if (location?.selectedDogs.length === 0 && auth.petInfos.length > 0) {
      dispatch(setSelectedDogs([auth.petInfos[0]]))
    }
    setIsPaused(false)
    setStartTime(new Date().getTime())
    setElapsedTime(0) // 임시저장 시간
    dispatch(setLoadingState(true))
    requestLocation()
    dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
    setShowFooter(false)

    // 상태를 업데이트 한 후 startMovement 호출
    setTimeout(() => {
      startMovement(dispatch, location, auth)
    }, 100)
  }

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
    startMovement(dispatch, location, location?.selectedDogs, auth)
  }

  const onClickStopTracking = async () => {
    const currentTime = new Date().getTime()
    const totalElapseTime = elapsedTime + (currentTime - startTime)
    setElapsedTime(totalElapseTime)
    stopMovement()
    dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
    clearWatcher()

    const walkRecordData = {
      routineId: selectedRoutineId,
      calorie: parseInt(location?.ownerCalories),
      distance: parseInt(location?.distance),
      walkTime: parseInt(convertToSeconds(location?.timer)),
      path: location?.path.map((loc) => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
      })),
      petRecords: location?.selectedDogs.map((dog) => {
        const dogCalories = location?.petCalories.find(
          (calorie) => calorie.id === dog.petId // 수정된 부분
        )
        return {
          petId: dog.petId,
          calorie: dogCalories
            ? Math.ceil(parseFloat(dogCalories.calories))
            : 0,
        }
      }),
    }
    try {
      const response = await createWalkRecord(walkRecordData)
      console.log("산책 기록 저장 완료", response)
    } catch (e) {
      console.error("산책 기록 저장 실패", e)
    }

    // selectedRoutineId를 state에 포함하여 navigate 호출
    navigate("/walk/result", { state: { selectedRoutineId } })
  }

  const handleNextDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === location?.selectedDogs.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevDog = () => {
    setCurrentDogIndex((prevIndex) =>
      prevIndex === 0 ? location?.selectedDogs.length - 1 : prevIndex - 1
    )
  }

  const currentDog = location?.selectedDogs[currentDogIndex]
  const currentDogCalories = location?.petCalories.find(
    (calorie) => calorie.petId === currentDog?.id
  )

  const handleDogSelection = (dog) => {
    if (
      location?.selectedDogs.some(
        (selectedDog) => selectedDog.petId === dog.petId
      )
    ) {
      dispatch(
        setSelectedDogs(
          location?.selectedDogs.filter(
            (selectedDog) => selectedDog.petId !== dog.petId
          )
        )
      )
    } else {
      dispatch(setSelectedDogs([...location?.selectedDogs, dog])) // 여러 마리 선택
    }
  }

  const handleCenterMap = () => {
    if (mapRef.current) {
      mapRef.current.centerMapOnCurrentLocation()
    }
  }

  if (error) return <div>{error}</div>

  if (location?.trackingState === "stop") {
    return <Outlet />
  }

  return (
    <>
      {location?.loading ? (
        <div className="walk-start-loading-container">
          <div>{loadingCount}</div>
        </div>
      ) : (
        <div className={`walk-container ${location?.tracking ? "active" : ""}`}>
          {location?.latitude && location?.longitude && loading === false ? (
            <div className="walk-map">
              <KakaoMap
                location={location}
                path={location?.path}
                distance={location?.distance}
                mapId="map"
                ref={mapRef} // forwardRef를 통해 ref 전달
                setLoading={setLoading}
              />
            </div>
          ) : (
            <div className="walk-loading-image-container">
              <img src={Loading} alt="맵 로딩 중" />
              <span>현재 위치를 불러오고 있어요</span>
            </div>
          )}

          {location?.latitude && location?.longitude && (
            <>
              {location?.tracking ? (
                <StopWalk
                  onClickStopTracking={onClickStopTracking}
                  onClickPauseTracking={onClickPauseTracking}
                  onClickRestartTracking={onClickRestartTracking}
                  isPaused={isPaused}
                  currentDog={currentDog}
                  currentDogCalories={currentDogCalories}
                  currentDogIndex={currentDogIndex}
                  handleNextDog={handleNextDog}
                  handlePrevDog={handlePrevDog}
                />
              ) : (
                <>
                  <WalkRoutine
                    routines={viewRoutines}
                    selectedRoutineId={selectedRoutineId}
                    setSelectedRoutineId={setSelectedRoutineId}
                  />
                  <div
                    className="walk-controls-current-position-icon"
                    onClick={handleCenterMap}
                  >
                    <CurrentPosition />
                  </div>

                  <StartWalk
                    onClickStartTracking={onClickStartTracking}
                    onShowDogSelection={() => setShowDogSelection(true)}
                    selectedDogs={location?.selectedDogs}
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
            {auth.petInfos.map((dog) => (
              <div key={dog.id} className="walk-dog-selection-item-container">
                <div
                  className={`walk-dog-selection-item ${
                    location?.selectedDogs.some(
                      (selectedDog) => selectedDog.petId === dog.petId
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleDogSelection(dog)}
                >
                  {location?.selectedDogs.some(
                    (selectedDog) => selectedDog.petId === dog.petId
                  ) && (
                    <div className="walk-dog-selection-item-icon-container">
                      <CheckDog />
                    </div>
                  )}

                  <img
                    src={`${process.env.REACT_APP_S3_URL}/${dog.image}`}
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
