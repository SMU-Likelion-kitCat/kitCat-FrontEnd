import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { setLocation } from "../redux/location"
import { setCurrentLocation } from "../utils/movement"

/**
 * 사용자가 움직이는 것을 계속 감지하기 위해 watchPosition 설정하는 Custom Hooks
 * @method requestLocation requestLocation 메서드 실행을 위해 watchPosition 실행
 * @method clearWatcher 위경도의 위치를 새로고침하는 메서드
 * @returns {error}  Custom Hooks 메서드 이외에 error 메세지도 반환
 */
export const useGeoLocation = (options) => {
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const watcherRef = useRef(null)
  const { geolocation } = navigator

  const requestLocation = () => {
    // navigator.geolocation에서 기능을 이용

    if (!geolocation) {
      setError("Geolocation이 지원되지 않습니다.")
      return
    }

    // watchPosition() 성공시 전역 상태 업데이트
    const handleSuccess = (pos) => {
      const { latitude, longitude } = pos.coords
      const location = { latitude, longitude }
      // 리덕스 초기 위경도 객체 업데이트
      dispatch(setLocation(location))
      // 초기 위경도 객체 업데이트
      setCurrentLocation(location)
    }

    // watchPosition() 에러 처리
    const handleError = (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        setError(
          "사용자가 위치 액세스를 거부했습니다. 위치 서비스를 활성화하고 페이지를 새로고침하세요."
        )
      } else {
        setError(err.message)
      }
    }

    // 사용자가 움직이는 것을 계속 감지하기 위해 watchPosition를 이용하여 watcherRef에 저장
    watcherRef.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    )
  }

  const clearWatcher = () => {
    if (watcherRef.current !== null) {
      geolocation.clearWatch(watcherRef.current)
    }
  }

  return { error, requestLocation, clearWatcher }
}
