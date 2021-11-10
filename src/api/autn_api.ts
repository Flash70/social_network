import {instance, ILogin, IAuthMeAPI, ILoginMeResponse} from "./api";
import {ILoginMe} from "../type/interface";






export const authAPI = {
    getMe() {
        return instance.get<ILogin<IAuthMeAPI>>("auth/me").then(res => res.data)
    },
    loginMe(obj: ILoginMe) {
        return instance.post<ILogin<ILoginMeResponse>>("auth/login", obj).then(res => res.data)
    },
    logOut() {
        return instance.delete<ILogin<ILoginMeResponse>>("auth/login").then(res => res.data)
    }
}
