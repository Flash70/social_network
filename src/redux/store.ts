import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authMeSlice from "./auth-reducer"
import profileSlice from "./profile-reducer"
import initialSlice from "./app-reducer"
import usersSlice from "./users-reducer"
import { reducer as formReducer } from "redux-form"


const rootReducer = combineReducers({
    authMeSlice, profileSlice, initialSlice, usersSlice,
    form: formReducer
})

export const store = configureStore({reducer: rootReducer})


export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
