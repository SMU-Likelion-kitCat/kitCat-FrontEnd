// // import { useCallback, useState, useEffect } from "react"
// // import KakaoMap from "../../components/KakaoMap"
// // import { useDispatch, useSelector } from "react-redux"
// // import {
// //   setTrackingState,
// //   setLoadingState,
// //   updateOwnerCalories,
// //   updatePetCalories,
// // } from "../../redux/location"
// // import { useGeoLocation } from "../../hooks/useGeoLocation"
// // import { startMovement, stopMovement } from "../../utils/movement"
// // import { useFooterVisibility } from "../../layout"
// // import StartWalk from "./components/StartWalk"
// // import StopWalk from "./components/StopWalk"
// // import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
// // import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"
// // import calculateBMICalories from "../../utils/walk/calculateBMICalories"
// // import calculatePetCalories from "../../utils/walk/calculatePetCalories"
// // import { Outlet, useNavigate } from "react-router-dom"

// // const Walk = () => {
// //   const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
// //   const [timer, setTimer] = useState("00:00:00") // 타이머 설정
// //   const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
// //   const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
// //   const [selectedDogs, setSelectedDogs] = useState([]) // 산책에 선택한 강아지
// //   const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
// //   const navigate = useNavigate()
// //   const userInfo = { height: 180, weight: 72 }
// //   const { error, requestLocation, clearWatcher } = useGeoLocation({
// //     enableHighAccuracy: false,
// //     timeout: 1000 * 30,
// //     maximumAge: 1000 * 3600 * 24,
// //   })
// //   const location = useSelector((state) => state.location)
// //   const dispatch = useDispatch()
// //   const { setShowFooter } = useFooterVisibility()

// //   useEffect(() => {
// //     requestLocation()
// //   }, [])

// //   useEffect(() => {
// //     if (location.loading && loadingCount > 0) {
// //       const countdown = setTimeout(() => {
// //         setLoadingCount((prevCount) => prevCount - 1)
// //       }, 1000)
// //       return () => clearTimeout(countdown)
// //     } else if (location.loading && loadingCount === 0) {
// //       dispatch(setLoadingState(false))
// //     }
// //   }, [location.loading, loadingCount, dispatch])

// //   useEffect(() => {
// //     let timerInterval
// //     if (location.tracking && !isPaused) {
// //       timerInterval = setInterval(() => {
// //         const startTime = new Date(location.walkStartTime)
// //         const now = new Date()
// //         const elapsedTime = new Date(now - startTime)
// //         const hours = String(elapsedTime.getUTCHours()).padStart(2, "0")
// //         const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0")
// //         const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0")
// //         setTimer(`${hours}:${minutes}:${seconds}`)
// //       }, 1000)
// //     } else {
// //       clearInterval(timerInterval)
// //     }
// //     return () => clearInterval(timerInterval)
// //   }, [location.tracking, location.walkStartTime, isPaused])

// //   const onClickStartTracking = useCallback(() => {
// //     if (selectedDogs.length === 0) {
// //       setSelectedDogs([dogs[0]])
// //     }

// //     dispatch(setLoadingState(true))
// //     requestLocation()
// //     dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
// //     startMovement(dispatch, location)
// //     setShowFooter(false)
// //   }, [requestLocation, dispatch, location, setShowFooter, selectedDogs])

// //   const onClickPauseTracking = () => {
// //     setIsPaused(true)
// //     dispatch(setTrackingState({ tracking: true, trackingState: "pause" }))
// //   }

// //   const onClickRestartTracking = () => {
// //     setIsPaused(false)
// //     dispatch(setTrackingState({ tracking: true, trackingState: "restart" }))
// //   }

// //   const onClickStopTracking = () => {
// //     stopMovement()
// //     dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
// //     clearWatcher()

// //     const { height, weight } = userInfo
// //     const ownerCalories = calculateBMICalories(
// //       location.distance,
// //       weight,
// //       height
// //     )
// //     dispatch(updateOwnerCalories(ownerCalories))

// //     selectedDogs.forEach((dog) => {
// //       const petCalories = calculatePetCalories(
// //         location.distance,
// //         dog.weight,
// //         dog.petState
// //       )
// //       dispatch(updatePetCalories({ petId: dog.id, calories: petCalories }))
// //     })

// //     navigate("/walk/result", {
// //       state: {
// //         path: location.path,
// //         distance: location.distance,
// //         timer,
// //         ownerCalories,
// //         selectedDogs,
// //         petCalories: location.petCalories,
// //       },
// //     })
// //   }

// import { useCallback, useState, useEffect } from "react"
// import KakaoMap from "../../components/KakaoMap"
// import { useDispatch, useSelector } from "react-redux"
// import { setTrackingState, setLoadingState } from "../../redux/location"
// import { useGeoLocation } from "../../hooks/useGeoLocation"
// import { startMovement, stopMovement } from "../../utils/movement"
// import { useFooterVisibility } from "../../layout"
// import StartWalk from "./components/StartWalk"
// import StopWalk from "./components/StopWalk"
// import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
// import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"
// import { Outlet, useNavigate } from "react-router-dom"

// const Walk = () => {
//   const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
//   const [timer, setTimer] = useState("00:00:00") // 타이머 설정
//   const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
//   const [pausedTime, setPausedTime] = useState(0) // 일시정지된 총 시간
//   const [lastPausedAt, setLastPausedAt] = useState(null) // 마지막으로 일시정지된 시간
//   const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
//   const [selectedDogs, setSelectedDogs] = useState([]) // 산책에 선택한 강아지
//   const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
//   const navigate = useNavigate()
//   const userInfo = { height: 180, weight: 72 }
//   const { error, requestLocation, clearWatcher } = useGeoLocation({
//     enableHighAccuracy: false,
//     timeout: 1000 * 30,
//     maximumAge: 1000 * 3600 * 24,
//   })
//   const location = useSelector((state) => state.location)
//   const dispatch = useDispatch()
//   const { setShowFooter } = useFooterVisibility()

//   useEffect(() => {
//     requestLocation()
//   }, [])

//   // 로딩화면 관련 설정
//   useEffect(() => {
//     if (location.loading && loadingCount > 0) {
//       const countdown = setTimeout(() => {
//         setLoadingCount((prevCount) => prevCount - 1)
//       }, 1000)
//       return () => clearTimeout(countdown)
//     } else if (location.loading && loadingCount === 0) {
//       dispatch(setLoadingState(false))
//     }
//   }, [location.loading, loadingCount, dispatch])

//   useEffect(() => {
//     let timerInterval
//     if (location.tracking && !isPaused) {
//       timerInterval = setInterval(() => {
//         const startTime = new Date(location.walkStartTime)
//         const now = new Date()
//         const elapsedTime = new Date(now - startTime - pausedTime)
//         const hours = String(elapsedTime.getUTCHours()).padStart(2, "0")
//         const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0")
//         const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0")
//         setTimer(`${hours}:${minutes}:${seconds}`)
//       }, 1000)
//     } else {
//       clearInterval(timerInterval)
//     }
//     return () => clearInterval(timerInterval)
//   }, [location.tracking, location.walkStartTime, isPaused, pausedTime])

//   const onClickStartTracking = useCallback(() => {
//     if (selectedDogs.length === 0) {
//       setSelectedDogs([dogs[0]])
//     }

//     dispatch(setLoadingState(true))
//     requestLocation()
//     dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
//     startMovement(dispatch, location, selectedDogs, userInfo)
//     setShowFooter(false)
//   }, [requestLocation, dispatch, location, setShowFooter, selectedDogs])

//   const onClickPauseTracking = () => {
//     setIsPaused(true)
//     setLastPausedAt(new Date()) // 일시정지 시간 설정
//     dispatch(setTrackingState({ tracking: true, trackingState: "pause" }))
//     stopMovement() // Pause movement updates
//   }

//   const onClickRestartTracking = () => {
//     setIsPaused(false)
//     if (lastPausedAt) {
//       const pausedDuration = new Date() - lastPausedAt // 일시정지된 시간 계산
//       setPausedTime((prevPausedTime) => prevPausedTime + pausedDuration)
//       setLastPausedAt(null) // 일시정지 시간 초기화
//     }
//     dispatch(setTrackingState({ tracking: true, trackingState: "restart" }))
//     startMovement(dispatch, location, selectedDogs, userInfo) // Resume movement updates
//   }

//   const onClickStopTracking = () => {
//     stopMovement()
//     dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
//     clearWatcher()

//     navigate("/walk/result", {
//       state: {
//         path: location.path,
//         distance: location.distance / 1000, // Convert to km
//         timer: location.timer,
//         ownerCalories: location.ownerCalories,
//         selectedDogs: location.selectedDogs,
//         petCalories: location.petCalories,
//       },
//     })
//   }

//   const handleNextDog = () => {
//     setCurrentDogIndex((prevIndex) =>
//       prevIndex === selectedDogs.length - 1 ? 0 : prevIndex + 1
//     )
//   }

//   const handlePrevDog = () => {
//     setCurrentDogIndex((prevIndex) =>
//       prevIndex === 0 ? selectedDogs.length - 1 : prevIndex - 1
//     )
//   }

//   const currentDog = selectedDogs[currentDogIndex]

//   const currentDogCalories = location.petCalories.find(
//     (calorie) => calorie.petId === currentDog.id
//   )

//   const handleDogSelection = (dog) => {
//     if (selectedDogs.some((selectedDog) => selectedDog.id === dog.id)) {
//       setSelectedDogs(
//         selectedDogs.filter((selectedDog) => selectedDog.id !== dog.id)
//       )
//     } else {
//       setSelectedDogs([...selectedDogs, dog])
//     }
//   }

//   const dogs = [
//     {
//       id: 1,
//       name: "몽몽이",
//       image: "/path_to_image_1",
//       weight: 5,
//       petState: "성장기 (4~12개월)",
//     },
//     {
//       id: 2,
//       name: "왕왕이",
//       image: "/path_to_image_2",
//       weight: 8,
//       petState: "미중성 성견",
//     },
//     {
//       id: 3,
//       name: "초코",
//       image: "/path_to_image_3",
//       weight: 12,
//       petState: "중성화 완료 성견",
//     },
//   ]

//   if (error) return <div>{error}</div>

//   if (location.trackingState === "stop") {
//     return <Outlet />
//   }

//   return (
//     <>
//       {location.loading ? (
//         <div className="walk-start-loading-container">
//           <div>{loadingCount}</div>
//         </div>
//       ) : (
//         <div className={`walk-container ${location.tracking ? "active" : ""}`}>
//           <div className="walk-map">
//             {location.latitude && location.longitude && (
//               <KakaoMap
//                 location={location}
//                 path={location.path}
//                 distance={location.distance}
//               />
//             )}
//           </div>

//           {location.latitude && location.longitude && (
//             <>
//               {location.tracking ? (
//                 <StopWalk
//                   onClickStopTracking={onClickStopTracking}
//                   onClickPauseTracking={onClickPauseTracking}
//                   onClickRestartTracking={onClickRestartTracking}
//                   isPaused={isPaused}
//                   timer={timer}
//                   location={location}
//                   selectedDogs={selectedDogs}
//                   currentDog={currentDog}
//                   currentDogCalories={currentDogCalories}
//                   currentDogIndex={currentDogIndex}
//                   handleNextDog={handleNextDog}
//                   handlePrevDog={handlePrevDog}
//                 />
//               ) : (
//                 <StartWalk
//                   onClickStartTracking={onClickStartTracking}
//                   onShowDogSelection={() => setShowDogSelection(true)}
//                   selectedDogs={selectedDogs}
//                 />
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {showDogSelection && (
//         <div className="walk-dog-selection-modal">
//           <div className="walk-dog-selection-modal-container">
//             <h2>강아지를 선택하세요</h2>
//             {dogs.map((dog) => (
//               <div key={dog.id} className="walk-dog-selection-item-container">
//                 <div
//                   className={`walk-dog-selection-item ${
//                     selectedDogs.some(
//                       (selectedDog) => selectedDog.id === dog.id
//                     )
//                       ? "selected"
//                       : ""
//                   }`}
//                   onClick={() => handleDogSelection(dog)}
//                 >
//                   {selectedDogs.some(
//                     (selectedDog) => selectedDog.id === dog.id
//                   ) && (
//                     <div className="walk-dog-selection-item-icon-container">
//                       <CheckDog />
//                     </div>
//                   )}
//                   <img src={dog.image} alt={dog.name} />
//                 </div>
//                 <p className="walk-dog-selection-item-name">{dog.name}</p>
//               </div>
//             ))}
//             <div
//               className="walk-dog-selection-modal-close"
//               onClick={() => setShowDogSelection(false)}
//             >
//               <DogModalClose />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Walk

// import { useCallback, useState, useEffect } from "react"
// import KakaoMap from "../../components/KakaoMap"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   setTrackingState,
//   setLoadingState,
//   updateOwnerCalories,
//   updatePetCalories,
// } from "../../redux/location"
// import { useGeoLocation } from "../../hooks/useGeoLocation"
// import { startMovement, stopMovement } from "../../utils/movement"
// import { useFooterVisibility } from "../../layout"
// import StartWalk from "./components/StartWalk"
// import StopWalk from "./components/StopWalk"
// import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
// import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"
// import calculateBMICalories from "../../utils/walk/calculateBMICalories"
// import calculatePetCalories from "../../utils/walk/calculatePetCalories"
// import { Outlet, useNavigate } from "react-router-dom"

// const Walk = () => {
//   const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
//   const [timer, setTimer] = useState("00:00:00") // 타이머 설정
//   const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
//   const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
//   const [selectedDogs, setSelectedDogs] = useState([]) // 산책에 선택한 강아지
//   const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
//   const navigate = useNavigate()
//   const userInfo = { height: 180, weight: 72 }
//   const { error, requestLocation, clearWatcher } = useGeoLocation({
//     enableHighAccuracy: false,
//     timeout: 1000 * 30,
//     maximumAge: 1000 * 3600 * 24,
//   })
//   const location = useSelector((state) => state.location)
//   const dispatch = useDispatch()
//   const { setShowFooter } = useFooterVisibility()

//   useEffect(() => {
//     requestLocation()
//   }, [])

//   useEffect(() => {
//     if (location.loading && loadingCount > 0) {
//       const countdown = setTimeout(() => {
//         setLoadingCount((prevCount) => prevCount - 1)
//       }, 1000)
//       return () => clearTimeout(countdown)
//     } else if (location.loading && loadingCount === 0) {
//       dispatch(setLoadingState(false))
//     }
//   }, [location.loading, loadingCount, dispatch])

//   useEffect(() => {
//     let timerInterval
//     if (location.tracking && !isPaused) {
//       timerInterval = setInterval(() => {
//         const startTime = new Date(location.walkStartTime)
//         const now = new Date()
//         const elapsedTime = new Date(now - startTime)
//         const hours = String(elapsedTime.getUTCHours()).padStart(2, "0")
//         const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0")
//         const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0")
//         setTimer(`${hours}:${minutes}:${seconds}`)
//       }, 1000)
//     } else {
//       clearInterval(timerInterval)
//     }
//     return () => clearInterval(timerInterval)
//   }, [location.tracking, location.walkStartTime, isPaused])

//   const onClickStartTracking = useCallback(() => {
//     if (selectedDogs.length === 0) {
//       setSelectedDogs([dogs[0]])
//     }

//     dispatch(setLoadingState(true))
//     requestLocation()
//     dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
//     startMovement(dispatch, location)
//     setShowFooter(false)
//   }, [requestLocation, dispatch, location, setShowFooter, selectedDogs])

//   const onClickPauseTracking = () => {
//     setIsPaused(true)
//     dispatch(setTrackingState({ tracking: true, trackingState: "pause" }))
//   }

//   const onClickRestartTracking = () => {
//     setIsPaused(false)
//     dispatch(setTrackingState({ tracking: true, trackingState: "restart" }))
//   }

//   const onClickStopTracking = () => {
//     stopMovement()
//     dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
//     clearWatcher()

//     const { height, weight } = userInfo
//     const ownerCalories = calculateBMICalories(
//       location.distance,
//       weight,
//       height
//     )
//     dispatch(updateOwnerCalories(ownerCalories))

//     selectedDogs.forEach((dog) => {
//       const petCalories = calculatePetCalories(
//         location.distance,
//         dog.weight,
//         dog.petState
//       )
//       dispatch(updatePetCalories({ petId: dog.id, calories: petCalories }))
//     })

//     navigate("/walk/result", {
//       state: {
//         path: location.path,
//         distance: location.distance,
//         timer,
//         ownerCalories,
//         selectedDogs,
//         petCalories: location.petCalories,
//       },
//     })
//   }

import { useCallback, useState, useEffect } from "react"
import KakaoMap from "../../components/KakaoMap"
import { useDispatch, useSelector } from "react-redux"
import { setTrackingState, setLoadingState } from "../../redux/location"
import { useGeoLocation } from "../../hooks/useGeoLocation"
import { startMovement, stopMovement } from "../../utils/movement"
import { useFooterVisibility } from "../../layout"
import StartWalk from "./components/StartWalk"
import StopWalk from "./components/StopWalk"
import { ReactComponent as DogModalClose } from "../../assets/walk/DogModalClose.svg"
import { ReactComponent as CheckDog } from "../../assets/walk/CheckDog.svg"
import { Outlet, useNavigate } from "react-router-dom"
import { loginUserInfo, petInfo } from "../../api"
import { setUserInfo, setPetInfos } from "../../redux/auth"

const Walk = () => {
  const [loadingCount, setLoadingCount] = useState(3) // 로딩 타이머 설정
  const [timer, setTimer] = useState("00:00:00") // 타이머 설정
  const [isPaused, setIsPaused] = useState(false) // 일시정지 유무
  const [pausedTime, setPausedTime] = useState(0) // 일시정지된 총 시간
  const [lastPausedAt, setLastPausedAt] = useState(null) // 마지막으로 일시정지된 시간
  const [showDogSelection, setShowDogSelection] = useState(false) // 강아지 모달 유무
  const [selectedDogs, setSelectedDogs] = useState([]) // 산책에 선택한 강아지
  const [currentDogIndex, setCurrentDogIndex] = useState(0) // 현재 보고 있는 강아지 정보
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
      } catch (e) {
        console.error("fetchPetInfo error", e)
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
  }, [
    auth.isLoggedIn,
    auth.height,
    auth.weight,
    auth.bmi,
    auth.nickname,
    auth.petInfos.length,
    dispatch,
  ])

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

  // 타이머 관련 설정
  useEffect(() => {
    let timerInterval
    if (location.tracking && !isPaused) {
      timerInterval = setInterval(() => {
        const startTime = new Date(location.walkStartTime)
        const now = new Date()
        const elapsedPausedTime =
          isPaused && lastPausedAt ? new Date() - lastPausedAt : 0
        const totalPausedTime = pausedTime + elapsedPausedTime
        const elapsedTime = new Date(now - startTime - totalPausedTime)
        const hours = String(elapsedTime.getUTCHours()).padStart(2, "0")
        const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0")
        const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0")
        setTimer(`${hours}:${minutes}:${seconds}`)
      }, 1000)
    } else {
      clearInterval(timerInterval)
    }
    return () => clearInterval(timerInterval)
  }, [
    location.tracking,
    location.walkStartTime,
    isPaused,
    pausedTime,
    lastPausedAt,
  ])

  const onClickStartTracking = useCallback(() => {
    if (selectedDogs.length === 0 && auth.petInfos.length > 0) {
      setSelectedDogs([auth.petInfos[0]])
    }

    dispatch(setLoadingState(true))
    requestLocation()
    dispatch(setTrackingState({ tracking: true, trackingState: "start" }))
    startMovement(dispatch, location, selectedDogs, auth)
    setShowFooter(false)
  }, [requestLocation, dispatch, location, setShowFooter, selectedDogs, auth])

  const onClickPauseTracking = () => {
    setIsPaused(true)
    setLastPausedAt(new Date()) // 일시정지 시간 설정
    dispatch(setTrackingState({ tracking: true, trackingState: "pause" }))
    stopMovement() // Pause movement updates
  }

  const onClickRestartTracking = () => {
    setIsPaused(false)
    if (lastPausedAt) {
      const pausedDuration = new Date() - lastPausedAt // 일시정지된 시간 계산
      setPausedTime((prevPausedTime) => prevPausedTime + pausedDuration)
      setLastPausedAt(null) // 일시정지 시간 초기화
    }
    dispatch(setTrackingState({ tracking: true, trackingState: "restart" }))
    startMovement(dispatch, location, selectedDogs, auth)
  }

  const onClickStopTracking = () => {
    stopMovement()
    dispatch(setTrackingState({ tracking: false, trackingState: "stop" }))
    clearWatcher()

    navigate("/walk/result", {
      state: {
        path: location.path,
        distance: location.distance / 1000, // Convert to km
        timer,
        ownerCalories: location.ownerCalories,
        selectedDogs,
        petCalories: location.petCalories,
      },
    })
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
