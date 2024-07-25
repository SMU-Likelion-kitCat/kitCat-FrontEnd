// import { createSlice } from "@reduxjs/toolkit"

// const locationSlice = createSlice({
//   name: "location",
//   initialState: {
//     latitude: null,
//     longitude: null,
//     path: [],
//     distance: 0,
//     steps: 0,
//     tracking: false,
//     loading: false,
//     ownerCalories: 0,
//     petCalories: 0,
//     walkStartTime: null, // 타이머 시작 시간
//   },
//   reducers: {
//     setLocation: (state, action) => {
//       const { latitude, longitude } = action.payload
//       state.latitude = latitude
//       state.longitude = longitude
//       if (state.tracking) {
//         state.path.push({ latitude, longitude })
//       }
//     },
//     resetLocation: (state) => {
//       state.latitude = null
//       state.longitude = null
//       state.path = []
//       state.distance = 0
//       state.steps = 0
//       state.ownerCalories = 0
//       state.petCalories = 0
//     },
//     updateDistanceAndSteps: (state, action) => {
//       state.distance += action.payload.distance
//       state.steps += action.payload.steps
//     },
//     setTrackingState: (state, action) => {
//       state.tracking = action.payload
//       if (action.payload) {
//         state.walkStartTime = new Date() // 산책 시작 시간 저장
//       } else {
//         state.walkStartTime = null // 산책 종료 시 초기화
//       }
//     },
//     setLoadingState: (state, action) => {
//       state.loading = action.payload
//     },
//     updateOwnerCalories: (state, action) => {
//       state.ownerCalories = action.payload
//     },
//     updatePetCalories: (state, action) => {
//       state.petCalories = action.payload
//     },
//   },
// })

// export const {
//   setLocation,
//   resetLocation,
//   updateDistanceAndSteps,
//   setTrackingState,
//   setLoadingState,
//   updateOwnerCalories,
//   updatePetCalories,
// } = locationSlice.actions
// export default locationSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: null,
    longitude: null,
    path: [],
    distance: 0,
    steps: 0,
    tracking: false,
    loading: false,
    ownerCalories: 0,
    petCalories: 0,
    walkStartTime: null, // 시작 시간을 저장하기 위한 state
  },
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload
      state.latitude = latitude
      state.longitude = longitude
      if (state.tracking) {
        state.path.push({ latitude, longitude })
      }
    },
    resetLocation: (state) => {
      state.latitude = null
      state.longitude = null
    },
    updateDistanceAndSteps: (state, action) => {
      state.distance += action.payload.distance
      state.steps += action.payload.steps
    },
    setTrackingState: (state, action) => {
      state.tracking = action.payload
      if (action.payload) {
        state.walkStartTime = new Date().toISOString() // 트래킹 시작 시점 설정
      }
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
    updateOwnerCalories: (state, action) => {
      state.ownerCalories = action.payload
    },
    updatePetCalories: (state, action) => {
      state.petCalories = action.payload
    },
  },
})

export const {
  setLocation,
  resetLocation,
  updateDistanceAndSteps,
  setTrackingState,
  setLoadingState,
  updateOwnerCalories,
  updatePetCalories,
} = locationSlice.actions

export default locationSlice.reducer
