// import { createSlice } from "@reduxjs/toolkit"

// const locationSlice = createSlice({
//   name: "location",
//   initialState: {
//     latitude: null, // 현재 위도 저장
//     longitude: null, // 현재 경도 저장
//     path: [], // 경로 위경도 저장
//     distance: 0, // 이동 거리 저장
//     tracking: false, // 산책 시장 유무
//     loading: false, // 산책 시작 버튼 로딩 유무
//     ownerCalories: 0, // 반려인 칼로리 소모량
//     petCalories: 0, // 강아지 칼로리 소모량
//     walkStartTime: null, // 시작 시간을 저장하기 위한 state
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
//         state.walkStartTime = new Date().toISOString() // 트래킹 시작 시점 설정
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
//   updateDistance,
//   setTrackingState,
//   setLoadingState,
//   updateOwnerCalories,
//   updatePetCalories,
// } = locationSlice.actions

// export default locationSlice.reducer

// import { createSlice } from "@reduxjs/toolkit"

// const locationSlice = createSlice({
//   name: "location",
//   initialState: {
//     latitude: null, // 현재 위도 저장
//     longitude: null, // 현재 경도 저장
//     path: [], // 경로 위경도 저장
//     distance: 0, // 이동 거리 저장
//     tracking: false, // 산책 시장 유무
//     loading: false, // 산책 시작 버튼 로딩 유무
//     ownerCalories: 0, // 반려인 칼로리 소모량
//     petCalories: [], // 강아지 칼로리 소모량 배열
//     walkStartTime: null, // 시작 시간을 저장하기 위한 state
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
//         state.walkStartTime = new Date().toISOString() // 트래킹 시작 시점 설정
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
//       const pet = state.petCalories.find((p) => p.id === petId)
//       if (pet) {
//         pet.calories = calories
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
    latitude: null,
    longitude: null,
    path: [],
    distance: 0,
    tracking: false,
    loading: false,
    ownerCalories: 0,
    petCalories: [], // 여러 마리의 반려견 칼로리 소모량 저장
    walkStartTime: null,
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
    updateDistance: (state, action) => {
      state.distance += action.payload.distance
    },
    setTrackingState: (state, action) => {
      state.tracking = action.payload
      if (action.payload) {
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
