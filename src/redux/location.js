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
