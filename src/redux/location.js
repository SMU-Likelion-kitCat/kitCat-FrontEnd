import { createSlice } from "@reduxjs/toolkit"

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: null, // 현재 경도 저장
    longitude: null, // 현재 위도 저장
    path: [], // 폴리곤을 저장하기 위한 path
    distance: 0, // 산책 거리 저장
    steps: 0, // 산책 걸음 수 저장
    tracking: false, // 산책을 하고 있는지 확인 boolean
  },
  reducers: {
    // 현재 위치 업데이트
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload
      state.latitude = latitude
      state.longitude = longitude
      if (state.tracking) {
        state.path.push({ latitude, longitude })
      }
    },
    // 현재 위치(경도, 위도) 초기화
    resetLocation: (state) => {
      state.latitude = null
      state.longitude = null
    },
    // 거리와 걸음걸이를 누적합
    updateDistanceAndSteps: (state, action) => {
      state.distance += action.payload.distance
      state.steps += action.payload.steps
    },
    // 산책 상태를 업데이트
    setTrackingState: (state, action) => {
      state.tracking = action.payload
    },
  },
})

export const {
  setLocation,
  resetLocation,
  updateDistanceAndSteps,
  setTrackingState,
} = locationSlice.actions
export default locationSlice.reducer
