import { setLocation, updateDistance } from "../redux/location"
import haversineDistance from "./haversineDistance"

let intervalRef = null
let currentLocation = null

export const startMovement = (dispatch, initialLocation) => {
  currentLocation = initialLocation

  intervalRef = setInterval(() => {
    if (currentLocation) {
      let lat = currentLocation.latitude
      let lng = currentLocation.longitude

      // 테스트 이동 코드
      // lat += 0.0001
      // lng += 0.0001
      const newLocation = { latitude: lat, longitude: lng }

      // 새로운 위치의 위경도와 현재 위경도가 같지 않을 때에만 업데이트
      if (
        newLocation.latitude !== currentLocation.latitude ||
        newLocation.longitude !== currentLocation.longitude
      ) {
        dispatch(setLocation(newLocation))

        const dist = haversineDistance(currentLocation, newLocation)
        const averageStepLength = 0.7

        if (dist >= 5 && dist < 20) {
          dispatch(
            updateDistance({
              distance: dist,
              steps: dist / averageStepLength,
            })
          )
        }

        currentLocation = newLocation
      }
    }
  }, 5000)
}

export const stopMovement = () => {
  clearInterval(intervalRef)
  intervalRef = null
}

export const setCurrentLocation = (location) => {
  currentLocation = location
}
