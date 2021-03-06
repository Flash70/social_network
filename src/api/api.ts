import axios from "axios";
import {IUser} from "../type/interface";


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "359e08de-0de3-4149-ba0c-09a519e98f6a"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});


export enum ResultCode {
    Success = 0,
    Error = 1,
    captcha = 10
}

export interface ILogin<D = {}, RS = ResultCode> {
    data: D
    messages: Array<string>
    resultCode: RS
}

export interface IAuthMeAPI {
    id: number | null
    email: string | null
    login: string | null
}

export interface ILoginMeResponse {
    userId: number | null
}
export interface IGetItems {
    items: Array<IUser>
    totalCount: number
    error: string | null
}
export interface IStatusProfile<D = {}, RS = ResultCode> {
    resultCode: RS
    messages: Array<string>
    data: D
}


