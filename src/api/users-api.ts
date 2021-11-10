import {IGetItems, instance, IStatusProfile} from "./api";







export const usersAPI = {
    getUsers(page = 1, count = 24) {
        return instance.get<IGetItems>(`users?count=${count}&page=${page}`).then(res => res.data)
    },
    follow(userId: number){
        return instance.post<IStatusProfile>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number){
        return instance.delete<IStatusProfile>(`follow/${userId}`).then(res => res.data)
    },

}