// import { createSlice } from "@reduxjs/toolkit"

// const initialLocationState = {
//   latitude: null,
//   longitude: null,
//   path: [],
//   distance: 0,
//   tracking: false,
//   trackingState: "init",
//   loading: false,
//   ownerCalories: 0,
//   trackingTime: null, // 00000000 초 형식 시간
//   petCalories: [], // 펫 칼로리 배열
//   selectedDogs: [], // 선택된 강아지 배열
//   timer: "00:00:00", // "00:00:00" 형식 시간
// }

// const locationSlice = createSlice({
//   name: "location",
//   initialState: initialLocationState,
//   reducers: {
//     setLocation: (state, action) => {
//       const { latitude, longitude } = action.payload
//       state.latitude = latitude
//       state.longitude = longitude
//       if (state.tracking) {
//         state.path.push({ latitude, longitude })
//       }
//     },
//     updateDistance: (state, action) => {
//       state.distance = action.payload.distance
//     },
//     setTrackingState: (state, action) => {
//       state.tracking = action.payload.tracking
//       state.trackingState = action.payload.trackingState
//     },
//     setTrackingTime: (state, action) => {
//       state.trackingTime = action.payload
//     },
//     setTimer: (state, action) => {
//       state.timer = action.payload
//     },
//     setLoadingState: (state, action) => {
//       state.loading = action.payload
//     },
//     updateOwnerCalories: (state, action) => {
//       state.ownerCalories = action.payload
//     },
//     setSelectedDogs: (state, action) => {
//       state.selectedDogs = action.payload
//     },
//     updatePetCalories: (state, action) => {
//       const { petId, calories } = action.payload
//       const petIndex = state.petCalories.findIndex((p) => p.id === petId)
//       if (petIndex !== -1) {
//         state.petCalories[petIndex].calories = calories
//       } else {
//         state.petCalories.push({ id: petId, calories })
//       }
//     },
//     resetLocationState: () => initialLocationState,
//   },
// })

// export const {
//   setLocation,
//   updateDistance,
//   setTrackingState,
//   setTrackingTime,
//   setLoadingState,
//   updateOwnerCalories,
//   updatePetCalories,
//   setTimer,
//   setSelectedDogs,
//   resetLocationState,
// } = locationSlice.actions

// export default locationSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const initialLocationState = {
  latitude: null,
  longitude: null,
  path: [],
  distance: 0,
  tracking: false,
  trackingState: "init",
  loading: false,
  ownerCalories: 0,
  trackingTime: null, // 00000000 초 형식 시간
  petCalories: [], // 펫 칼로리 배열
  selectedDogs: [], // 선택된 강아지 배열
  timer: "00:00:00", // "00:00:00" 형식 시간
}

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload
      state.latitude = latitude
      state.longitude = longitude
      if (state.tracking) {
        state.path.push({ latitude, longitude })
      }
    },
    updateDistance: (state, action) => {
      state.distance = action.payload.distance
    },
    setTrackingState: (state, action) => {
      state.tracking = action.payload.tracking
      state.trackingState = action.payload.trackingState
    },
    setTrackingTime: (state, action) => {
      state.trackingTime = action.payload
    },
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
    updateOwnerCalories: (state, action) => {
      state.ownerCalories = action.payload
    },
    setSelectedDogs: (state, action) => {
      state.selectedDogs = action.payload
    },
    updatePetCalories: (state, action) => {
      const { petId, calories } = action.payload
      const petIndex = state.petCalories.findIndex((p) => p.id === petId)
      if (petIndex !== -1) {
        state.petCalories[petIndex].calories = calories
      } else {
        // 초기설정이면
        state.petCalories.push({ id: petId, calories })
      }
    },
    resetLocationState: (state) => {
      Object.assign(state, initialLocationState)
    },
  },
})

export const {
  setLocation,
  updateDistance,
  setTrackingState,
  setTrackingTime,
  setLoadingState,
  updateOwnerCalories,
  updatePetCalories,
  setTimer,
  setSelectedDogs,
  resetLocationState,
} = locationSlice.actions

export default locationSlice.reducer
