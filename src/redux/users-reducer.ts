import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "./store";
import {IUser} from "../type/interface";
import {usersAPI} from "../api/users-api";
import {IGetItems, ResultCode} from "../api/api";


interface initialStateUsers {
    users: Array<IUser>
    count: number
    totalCount: number
    page: number
    isFetching: boolean
    isLoading: boolean
}

const initialState: initialStateUsers = {
    users: [{
        id: 1,
        name: "",
        status: "",
        photos: {
            small: null,
            large: null
        },
        followed: false
    }],
    count: 24,
    totalCount: 0,
    page: 1,
    isFetching: true,
    isLoading: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IGetItems>) {
            state.users = action.payload.items
            state.totalCount = action.payload.totalCount
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        isLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        follow(state, action: PayloadAction<number>) {
            state.users.map(item => {
                if (item.id === action.payload) {
                    return item.followed = true
                }
                return state
            })
        },
        unfollow(state, action: PayloadAction<number>) {
            state.users.map(item => {
                if (item.id === action.payload) {
                    return item.followed = false
                }
                return state
            })
        }
    }
})

export const {setUsers, setCurrentPage, isLoading, unfollow, follow} = usersSlice.actions

// export const getUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(isLoading(true))
//         const res = await usersAPI.getUsers()
//         dispatch(setUsers(res))
//         dispatch(isLoading(false))
//     } catch (error) {
//         alert("Ошибка при запросе пользователей");
//         console.error(error);
//     }
// }
export const getCurrentPage = (pageNumber: number, count: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(isLoading(true))
        const res = await usersAPI.getUsers(pageNumber, count)
        dispatch(setUsers(res))
        dispatch(setCurrentPage(pageNumber))
        dispatch(isLoading(false))
    } catch (error) {
        alert("Ошибка при запросе страницы");
        console.error(error);
    }
}

export const getFollowUser = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await usersAPI.follow(userId)
        if (res.resultCode === ResultCode.Success) {
            dispatch(follow(userId))
        }
    } catch (error) {
        alert("Ошибка при запросе follow");
        console.error(error);
    }
}
export const getUnfollowUser = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await usersAPI.unfollow(userId)
        if (res.resultCode === ResultCode.Success) {
            dispatch(unfollow(userId))
        }
    } catch (error) {
        alert("Ошибка при запросе unfollow");
        console.error(error);
    }
}


export default usersSlice.reducer;