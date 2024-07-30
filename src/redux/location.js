// import { createSlice } from "@reduxjs/toolkit"

// const locationSlice = createSlice({
//   name: "location",
//   initialState: {
//     latitude: null,
//     longitude: null,
//     path: [],
//     distance: 0,
//     tracking: false,
//     loading: false,
//     ownerCalories: 0,
//     petCalories: [], // 여러 마리의 반려견 칼로리 소모량 저장
//     walkStartTime: null,
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
//     },
//     updateDistance: (state, action) => {
//       state.distance += action.payload.distance
//     },
//     setTrackingState: (state, action) => {
//       state.tracking = action.payload
//       if (action.payload) {
//         state.walkStartTime = new Date().toISOString()
//       }
//     },
//     setLoadingState: (state, action) => {
//       state.loading = action.payload
//     },
//     updateOwnerCalories: (state, action) => {
//       state.ownerCalories = action.payload
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
//   },
// })

// export const {
//   setLocation,
//   resetLocation,
//   updateDistance,
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
    latitude: null, // 현재 위도
    longitude: null, // 현재 경도
    path: [], // 기록된 위경도 { latitude, longitude }
    distance: 0, // 총 거리
    tracking: false, // 산책 시작 유무
    trackingState: "init", // 산택 상태 디테일
    loading: false, // 로딩 화면 유무
    ownerCalories: 0, // 반려인의 칼로리
    petCalories: [], // 여러 마리의 반려견 칼로리 소모량 저장
    walkStartTime: null, // 시작 시간
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
      state.path = []
      state.distance = 0
      state.ownerCalories = 0
      state.petCalories = []
    },
    updateDistance: (state, action) => {
      state.distance += action.payload.distance
    },
    setTrackingState: (state, action) => {
      state.tracking = action.payload.tracking
      state.trackingState = action.payload.trackingState
      if (action.payload.tracking) {
        state.walkStartTime = new Date().toISOString()
      }
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
    updateOwnerCalories: (state, action) => {
      state.ownerCalories = action.payload
    },
    updatePetCalories: (state, action) => {
      const { petId, calories } = action.payload
      const petIndex = state.petCalories.findIndex((p) => p.id === petId)
      if (petIndex !== -1) {
        state.petCalories[petIndex].calories = calories
      } else {
        state.petCalories.push({ id: petId, calories })
      }
    },
  },
})

export const {
  setLocation,
  resetLocation,
  updateDistance,
  setTrackingState,
  setLoadingState,
  updateOwnerCalories,
  updatePetCalories,
} = locationSlice.actions

export default locationSlice.reducer
