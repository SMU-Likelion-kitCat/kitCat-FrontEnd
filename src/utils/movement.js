// import {
//   setLocation,
//   updateDistance,
//   updateOwnerCalories,
//   updatePetCalories,
// } from "../redux/location"
// import haversineDistance from "./haversineDistance"
// import calculateBMICalories from "./walk/calculateBMICalories"
// import calculatePetCalories from "./walk/calculatePetCalories"

// let intervalRef = null
// let currentLocation = null
// let totalDistance = 0

// export const startMovement = (
//   dispatch,
//   initialLocation,
//   selectedDogs,
//   userInfo
// ) => {
//   console.log("selectedDogs 배열", selectedDogs)
//   console.log("userInfo 배열", userInfo)
//   currentLocation = initialLocation

//   intervalRef = setInterval(() => {
//     if (currentLocation) {
//       let lat = currentLocation.latitude
//       let lng = currentLocation.longitude

//       // 테스트 이동 코드
//       lat += 0.0001
//       lng += 0.0001
//       const newLocation = { latitude: lat, longitude: lng }

//       // 새로운 위치의 위경도와 현재 위경도가 같지 않을 때에만 업데이트
//       if (
//         newLocation.latitude !== currentLocation.latitude ||
//         newLocation.longitude !== currentLocation.longitude
//       ) {
//         dispatch(setLocation(newLocation))

//         const dist = haversineDistance(currentLocation, newLocation)

//         const averageStepLength = 0.7

//         if (dist >= 5 && dist < 20) {
//           totalDistance += dist
//           console.log("하버사인 공식에 의한 거리", totalDistance)
//           dispatch(
//             updateDistance({
//               distance: totalDistance,
//               steps: totalDistance / averageStepLength,
//             })
//           )

//           // 반려인 calories 업데이트
//           const ownerCalories = calculateBMICalories(
//             totalDistance / 1000, // km
//             userInfo.weight,
//             userInfo.height
//           )
//           console.log("업데이트된 ownerCalories:", ownerCalories) // 로그 추가
//           dispatch(updateOwnerCalories(ownerCalories))

//           // 반려견 칼로리 업데이트
//           selectedDogs.forEach((dog) => {
//             console.log(dog)
//             const petCalories = calculatePetCalories(
//               totalDistance / 1000, // distance는 이미 m 단위임
//               dog.weight
//             )
//             console.log("업데이트된 petCalories:", petCalories)
//             dispatch(
//               updatePetCalories({
//                 petId: dog.id,
//                 calories: petCalories, // 소수점 3자리로 포맷
//               })
//             )
//           })
//         }

//         currentLocation = newLocation
//       }
//     }
//   }, 5000)
// }

// export const stopMovement = () => {
//   clearInterval(intervalRef)
//   intervalRef = null
// }

// export const setCurrentLocation = (location) => {
//   currentLocation = location
// }

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
let currentLocationLatitude = null
let currentLocationLongitude = null
let totalDistance = 0

export const startMovement = (dispatch, location, auth) => {
  const selectedDogs = location.selectedDogs

  console.log("selectedDogs 배열", selectedDogs)
  console.log("auth 배열", auth)

  currentLocationLatitude = location.latitude
  currentLocationLongitude = location.longitude

  intervalRef = setInterval(() => {
    if (currentLocationLatitude && currentLocationLongitude) {
      let lat = currentLocationLatitude
      let lng = currentLocationLongitude

      // 테스트 이동 코드
      lat += 0.0001
      lng += 0.0001
      const newLocation = { latitude: lat, longitude: lng }

      // 새로운 위치의 위경도와 현재 위경도가 같지 않을 때에만 업데이트
      if (
        newLocation.latitude !== currentLocationLatitude ||
        newLocation.longitude !== currentLocationLongitude
      ) {
        dispatch(setLocation(newLocation))

        const currentLocation = {
          latitude: currentLocationLatitude,
          longitude: currentLocationLongitude,
        }
        const dist = haversineDistance(currentLocation, newLocation)

        const averageStepLength = 0.7

        if (dist >= 5 && dist < 20) {
          totalDistance += dist
          console.log("하버사인 공식에 의한 거리", totalDistance)
          dispatch(
            updateDistance({
              distance: totalDistance,
              steps: totalDistance / averageStepLength,
            })
          )

          // 반려인 calories 업데이트
          const ownerCalories = calculateBMICalories(
            totalDistance / 1000, // km
            auth.weight,
            auth.height
          )
          console.log("업데이트된 ownerCalories:", ownerCalories) // 로그 추가
          dispatch(updateOwnerCalories(ownerCalories))

          // 반려견 칼로리 업데이트
          selectedDogs.forEach((dog) => {
            console.log(dog)
            const petCalories = calculatePetCalories(
              totalDistance / 1000, // distance는 이미 m 단위임
              dog.weight
            )
            console.log("업데이트된 petCalories:", petCalories)
            dispatch(
              updatePetCalories({
                petId: dog.id,
                calories: petCalories, // 소수점 3자리로 포맷
              })
            )
          })
        }

        currentLocationLatitude = newLocation.latitude
        currentLocationLongitude = newLocation.longitude
      }
    }
  }, 5000)
}

export const stopMovement = () => {
  clearInterval(intervalRef)
  intervalRef = null
}

export const setCurrentLocation = (location) => {
  currentLocationLatitude = location.latitude
  currentLocationLongitude = location.longitude
}
