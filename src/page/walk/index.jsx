import { useCallback, useState, useEffect } from "react"
import KakaoMap from "../../components/KakaoMap"
import { useDispatch, useSelector } from "react-redux"
import {
  setTrackingState,
  setLoadingState,
  updateOwnerCalories,
  updatePetCalories,
} from "../../redux/location"
import { useGeoLocation } from "../../hooks/useGeoLocation"
import { startMovement, stopMovement } from "../../utils/movement"
import { useFooterVisibility } from "../../layout"

import StartWalk from "./components/StartWalk"
import StopWalk from "./components/StopWalk"

import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"

const Walk = () => {
  const [loadingCount, setLoadingCount] = useState(3)
  const [timer, setTimer] = useState("00:00:00")
  const [isPaused, setIsPaused] = useState(false) // 일시정지 상태 추가
  const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 선택 모달 상태 추가
  const [selectedDogs, setSelectedDogs] = useState([]) // 선택된 강아지 상태 추가

  const { error, requestLocation, clearWatcher } = useGeoLocation({
    enableHighAccuracy: false,
    timeout: 1000 * 30,
    maximumAge: 1000 * 3600 * 24,
  })
  const location = useSelector((state) => state.location)
  const dispatch = useDispatch()
  const { setShowFooter } = useFooterVisibility()

  useEffect(() => {
    requestLocation()
  }, [])

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

  useEffect(() => {
    let timerInterval
    if (location.tracking && !isPaused) {
      timerInterval = setInterval(() => {
        const startTime = new Date(location.walkStartTime)
        const now = new Date()
        const elapsedTime = new Date(now - startTime)
        const hours = String(elapsedTime.getUTCHours()).padStart(2, "0")
        const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0")
        const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0")
        setTimer(`${hours}:${minutes}:${seconds}`)
      }, 1000)
    } else {
      clearInterval(timerInterval)
    }
    return () => clearInterval(timerInterval)
  }, [location.tracking, location.walkStartTime, isPaused])

  const calculateCalories = (distance, weight, factor) => {
    return (distance * weight * factor).toFixed(2)
  }

  const onClickStartTracking = useCallback(() => {
    dispatch(setLoadingState(true))
    requestLocation()
    dispatch(setTrackingState(true))
    startMovement(dispatch, location)
    setShowFooter(false)
  }, [requestLocation, dispatch, location, setShowFooter])

  const onClickPauseTracking = () => {
    setIsPaused(true)
  }

  const onClickRestartTracking = () => {
    setIsPaused(false)
  }

  const onClickStopTracking = () => {
    stopMovement()
    dispatch(setTrackingState(false))
    clearWatcher()
    setShowFooter(true)

    const ownerWeight = 70 // kg
    const petWeight = 10 // kg
    const ownerCalFactor = 0.035
    const petCalFactor = 0.04

    const ownerCalories = calculateCalories(
      location.distance,
      ownerWeight,
      ownerCalFactor
    )
    const petCalories = calculateCalories(
      location.distance,
      petWeight,
      petCalFactor
    )

    dispatch(updateOwnerCalories(ownerCalories))
    dispatch(updatePetCalories(petCalories))
  }

  const handleDogSelection = (dog) => {
    if (selectedDogs.some((selectedDog) => selectedDog.id === dog.id)) {
      setSelectedDogs(
        selectedDogs.filter((selectedDog) => selectedDog.id !== dog.id)
      )
    } else {
      setSelectedDogs([...selectedDogs, dog])
    }
  }

  const dogs = [
    { id: 1, name: "몽몽이", image: "/path_to_image_1" },
    { id: 2, name: "왕왕이", image: "/path_to_image_2" },
    { id: 3, name: "초코", image: "/path_to_image_3" },
  ]

  if (error) return <div>{error}</div>

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
                />
              ) : (
                <StartWalk
                  onClickStartTracking={onClickStartTracking}
                  onShowDogSelection={() => setShowDogSelection(true)}
                  selectedDogs={selectedDogs}
                />
              )}
            </>
          )}
        </div>
      )}

      {showDogSelection && (
        <div className="walk-dog-selection-modal">
          <div className="walk-dog-selection-modal-container">
            <h2>강아지를 선택하세요</h2>
            {dogs.map((dog) => (
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
                  <img src={dog.image} alt={dog.name} />
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
