import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profile_api";
import {AppDispatch} from "./store";
import {IProfileUser} from "../type/interface";
import {ResultCode} from "../api/api";
import {stopSubmit} from "redux-form";

interface initialStateProfile {
    user: IProfileUser
    status: string
    isLoading: boolean
}


const initialState: initialStateProfile = {
    user: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: null,
        userId: null,
        photos: {
            small: null,
            large: null
        }
    },
    status: "",
    isLoading: false
}

const profileSlice = createSlice({
    name: "profileReducer",
    initialState,
    reducers: {
        getProfile(state, action: PayloadAction<IProfileUser>) {
            state.user = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        },
        isLoading (state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

const {getProfile, setStatus, isLoading} = profileSlice.actions;

export const getProfileUser = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(isLoading(true))
        const res = await profileAPI.getProfile(id);
        dispatch(getProfile(res));
        dispatch(isLoading(false))
    } catch (error) {
        alert("Шибка при запросе профиля");
        console.error(error);
    }
}

export const setProfileUser = (profile: IProfileUser) => async (dispatch: AppDispatch) => {
    try {
        const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === ResultCode.Success) {
            if (profile.userId != null) {
                dispatch(getProfileUser(profile.userId))
            }
        } else if (data.resultCode === ResultCode.Error) {
            const messages = data.messages.length > 0 ? data.messages[0] : "Не правильный формат"
            dispatch(stopSubmit("edit-profile", {_error: messages}))
        }
    } catch (error) {
        alert("Ошибка при изменении профиля");
        console.error(error);
    }
}
 export const getStatusProfile = (id: number) => async (dispatch: AppDispatch) => {
     try {
         const res = await profileAPI.getStatus(id);
         dispatch(setStatus(res));
     } catch (error) {
         alert("Ошибка при запросе статуса");
         console.error(error);
     }
 }

export const setStatusProfile = (str: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await profileAPI.updateStatus(str);
        if (res.resultCode === ResultCode.Success) {
            dispatch(setStatus(str))
        }
    } catch (error) {
        alert("Ошибка при обновлении статуса");
        console.error(error);
    }
}
export const setPhotoProfile = (photo: File, id: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await profileAPI.updatePhoto(photo);
        debugger
        if (res.resultCode === ResultCode.Success) {
            dispatch(getProfileUser(id))
        }
    } catch (error) {
        alert("Ошибка при обновлении фотографии");
        console.error(error);
    }
}


export default profileSlice.reducer