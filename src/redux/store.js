import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storageSession from "redux-persist/lib/storage/session"
import authReducer from "./auth"
import locationReducer from "./location"

const persistConfig = {
  key: "root",
  storage: storageSession, // 리덕스 세션 스토리지 사용
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    location: locationReducer,
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
