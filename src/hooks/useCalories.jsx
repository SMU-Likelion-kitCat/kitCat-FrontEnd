// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { updateOwnerCalories, updatePetCalories } from "../redux/location"
// import calculateBMICalories from "../utils/walk/calculateBMICalories"
// import calculatePetCalories from "../utils/walk/calculatePetCalories"

// const useCalories = (totalDistance, userInfo, selectedDogs) => {
//   const dispatch = useDispatch()
//   const location = useSelector((state) => state.location)

//   useEffect(() => {
//     if (location.tracking) {
//       // Owner calories update
//       const ownerCalories = calculateBMICalories(
//         totalDistance / 1000, // Convert to km
//         userInfo.weight,
//         userInfo.height
//       )
//       dispatch(updateOwnerCalories(ownerCalories))

//       // Pet calories update
//       selectedDogs.forEach((dog) => {
//         const petCalories = calculatePetCalories(
//           totalDistance / 1000, // Convert to km
//           dog.weight,
//           dog.petState
//         )
//         dispatch(
//           updatePetCalories({
//             petId: dog.id,
//             calories: parseFloat(petCalories),
//           })
//         )
//       })
//     }
//   }, [totalDistance, userInfo, selectedDogs, location.tracking, dispatch])
// }

// export default useCalories

// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { updateOwnerCalories, updatePetCalories } from "../redux/location"
// import calculateBMICalories from "../utils/walk/calculateBMICalories"
// import calculatePetCalories from "../utils/walk/calculatePetCalories"

// const useCalories = (totalDistance, userInfo, selectedDogs) => {
//   const dispatch = useDispatch()
//   const location = useSelector((state) => state.location)

//   useEffect(() => {
//     if (location.tracking && userInfo) {
//       // Owner calories update
//       const ownerCalories = calculateBMICalories(
//         totalDistance / 1000, // Convert to km
//         userInfo.weight,
//         userInfo.height
//       )
//       dispatch(updateOwnerCalories(ownerCalories))

//       // Pet calories update
//       selectedDogs.forEach((dog) => {
//         const petCalories = calculatePetCalories(
//           totalDistance / 1000, // Convert to km
//           dog.weight,
//           dog.petState
//         )
//         dispatch(
//           updatePetCalories({
//             petId: dog.id,
//             calories: parseFloat(petCalories),
//           })
//         )
//       })
//     }
//   }, [totalDistance, userInfo, selectedDogs, location.tracking, dispatch])
// }

// export default useCalories
