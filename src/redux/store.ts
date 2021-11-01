import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authMeReducer from "./auth";
import profileReducer from "./profile"


const rootReducer = combineReducers({authMeReducer, profileReducer});

export const store = configureStore({reducer: rootReducer});
