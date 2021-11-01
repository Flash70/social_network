import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profile_api";
import {AppDispatch} from "./store";
import {ProfileType} from "../type/interface";




const initialState: ProfileType = {
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
}

const profileSlice = createSlice({
    name: "profileReducer",
    initialState,
    reducers: {
        getProfile(state, action: PayloadAction<ProfileType>) {
            return action.payload;
        }
    }
})

const {getProfile} = profileSlice.actions;

export const getProfileUser = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await profileAPI.getProfile(id);
        dispatch(getProfile(res));
    } catch (error) {
        alert("Шибка при запросе профиля");
        console.error(error);
    }
}


export default profileSlice.reducer