import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth"
import locationReducer from "./location"

const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
  },
})

export default store
