import {
  setLocation,
  updateDistance,
  updateOwnerCalories,
  updatePetCalories,
} from "../redux/location"
import haversineDistance from "./haversineDistance"
import calculateBMICalories from "./walk/calculateBMICalories"
import calculatePetCalories from "./walk/calculatePetCalories"

let intervalRef = null
let currentLocation = null
let totalDistance = 0

export const startMovement = (
  dispatch,
  initialLocation,
  selectedDogs,
  userInfo
) => {
  console.log("selectedDogs 배열", selectedDogs)
  console.log("userInfo 배열", userInfo)
  currentLocation = initialLocation

  intervalRef = setInterval(() => {
    if (currentLocation) {
      let lat = currentLocation.latitude
      let lng = currentLocation.longitude

      // 테스트 이동 코드
      lat += 0.0001
      lng += 0.0001
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
          totalDistance += dist
          dispatch(
            updateDistance({
              distance: dist,
              steps: dist / averageStepLength,
            })
          )

          // 반려인 calories 업데이트
          const ownerCalories = calculateBMICalories(
            totalDistance / 1000, // km로 변환
            userInfo.weight,
            userInfo.height
          )
          console.log("Updated ownerCalories:", ownerCalories) // 로그 추가
          dispatch(updateOwnerCalories(ownerCalories))

          // Pet calories update
          selectedDogs.forEach((dog) => {
            console.log(dog)
            const petCalories = calculatePetCalories(
              totalDistance / 1000, // Convert to km
              dog.weight
            )
            console.log("Updated petCalories:", petCalories) // 로그 추가
            dispatch(
              updatePetCalories({
                petId: dog.id,
                calories: parseFloat(petCalories),
              })
            )
          })
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
