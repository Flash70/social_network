import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {authAPI} from "../api/autn_api"
import {AppDispatch} from "./store";
import {IPhotosUser, ILoginMe, IProfileUser} from "../type/interface";
import {ResultCode} from "../api/api";
import {securityAPI, securityType} from "../api/security_api";
import {stopSubmit} from "redux-form";
import {profileAPI} from "../api/profile_api";


export interface initialStateInterface {
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
    isAuth?: boolean
    error?: string
    messages: Array<string>
    captcha?: string
    photos?: IPhotosUser
}

const initialState: initialStateInterface = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    isAuth: false,
    error: '',
    messages: [],
    captcha: "",
    photos: {
        small: null,
        large: null
    }
}


const authMeSlice = createSlice({
    name: "authMeReducer",
    initialState,
    reducers: {
        getAuthMe(state, action: PayloadAction<initialStateInterface>) {
            state.data = action.payload.data
            state.isAuth = true
        },
        getAuthMeError(state, action: PayloadAction<Array<string>>) {
            state.isAuth = false
            state.messages = action.payload
        },
        setSecurity(state, action: PayloadAction<securityType>) {
            state.captcha = action.payload.url
        },
        getOutLogin(state) {
            state.data = {id: null, email: null, login: null,}
            state.isAuth = false
        },
        getPhotosUsers(state, action: PayloadAction<IProfileUser>) {
            state.photos = action.payload.photos
        }
    }
})

const {getAuthMe, setSecurity, getOutLogin, getAuthMeError, getPhotosUsers} = authMeSlice.actions


export const getAuthMeServer = () => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.getMe()
        if (res.data.id != null) {
            const data = await profileAPI.getProfile(res.data.id)
            dispatch(getPhotosUsers(data))
            if (res.resultCode === ResultCode.Success) {
                dispatch(getAuthMe(res))
            } else if (res.resultCode === ResultCode.Error) {
                dispatch(getAuthMeError(res.messages))
            }
        }

    } catch (error) {
        alert("?????????? ?????? ????????????????????????????");
        console.error(error);
    }
}

export const setAuthMeLogin = (obj: ILoginMe) => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.loginMe(obj)
        if (res.resultCode === ResultCode.Success) {
            dispatch(getAuthMeServer())
        } else if (res.resultCode === ResultCode.captcha) {
            const res = await securityAPI.security()
            dispatch(setSecurity(res))
        } else if (res.resultCode === ResultCode.Error) {
            const messages = res.messages.length > 0 ? res.messages[0] : "???? ???????????????????? Email ?????? ????????????"
            dispatch(stopSubmit("login", {_error: messages}))
        }
    } catch (error) {
        alert("?????????? ?????? ??????????????????????");
        console.error(error);
    }
}

export const setIsOutLogin = () => async (dispatch: AppDispatch) => {
    try {
        await authAPI.logOut()
        dispatch(getOutLogin())
    } catch (error) {
        alert("?????????? ?????? ???????????? ???? ????????????????????");
        console.error(error);
    }
}


export default authMeSlice.reducer