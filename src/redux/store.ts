import { persistReducer, persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootReducer } from "./rootReducers"

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth", "app"],
    timeout: 10000
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        root:persistedReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            
        })
})

export const persistor = persistStore(store)