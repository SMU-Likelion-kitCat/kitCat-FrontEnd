import { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import { updateDistanceAndSteps } from "../redux/location"
import haversineDistance from "../utils/haversineDistance"

/**
 * 위경도의 위치를 갱신하고 거리와 걸음을 계산하는 Custom Hooks
 * @method updateDistance 위경도의 위치를 업데이트하는 메서드
 * @method refreshDistance 위경도의 위치를 새로고침하는 메서드
 * 현재는 movementServices.js를 사용함
 */
export const useDistanceTracker = () => {
  const dispatch = useDispatch()
  const currentLocationRef = useRef(null)

  // 위경도를 업데이트하는 메서드
  const updateDistance = useCallback(
    (newLocation) => {
      // 일전에 위치가 있다면
      if (currentLocationRef.current) {
        // 일전의 위치와 새로운 위치를 하버사인
        const dist = haversineDistance(currentLocationRef.current, newLocation)
        const averageStepLength = 0.8

        if (0 <= dist && dist <= 20) {
          dispatch(
            updateDistanceAndSteps({
              distance: dist,
              // steps: dist / averageStepLength, // 거리를 평균 보폭으로 나눈 정보
            })
          )
          // 현재 위치로 갱신
          currentLocationRef.current = newLocation
        }
      } else {
        // 현재 위치로 갱신
        currentLocationRef.current = newLocation
      }
    },
    [dispatch]
  )

  // 현재 위치의 위경도를 새로고침 메서드
  const refreshDistance = useCallback((newLocation) => {
    // 현재 위치로 갱신
    currentLocationRef.current = newLocation
  }, [])

  return {
    refreshDistance,
    updateDistance,
  }
}
