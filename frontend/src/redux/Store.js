import {configureStore } from '@reduxjs/toolkit'
import AuthSlice from "./AuthSlice.js"
import storage from "redux-persist/lib/storage";
import {persistReducer , persistStore} from "redux-persist";

const persistConfig = {
    key:"root",
    storage,
}

const pReducer = persistReducer(persistConfig,AuthSlice)
export const store = configureStore({
    reducer:{
        Auth:pReducer
    }
})

export const persistor = persistStore(store);