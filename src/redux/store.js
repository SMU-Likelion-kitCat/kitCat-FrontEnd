// import { configureStore } from "@reduxjs/toolkit"
// import authReducer from "./auth"
// import locationReducer from "./location"

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     location: locationReducer,
//   },
// })

// export default store

import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import authReducer from "./auth"
import locationReducer from "./location"

const persistConfig = {
  key: "root",
  storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedLocationReducer = persistReducer(persistConfig, locationReducer)

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    location: persistedLocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
