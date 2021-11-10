import {IProfileUser} from "../type/interface";
import {instance, ILogin, IStatusProfile} from "./api";



export const profileAPI = {
    getProfile(userId: number) { return instance.get<IProfileUser>("profile/" + userId).then(res => res.data)},
    saveProfile(profile: IProfileUser) { return instance.put<ILogin>("profile", profile).then(res => res.data)},
    getStatus(userId: number) { return instance.get<string>("profile/status/"+ userId).then(res => res.data)},
    updateStatus(str: string) { return instance.put<IStatusProfile>("profile/status/", {status: str}).then(res => res.data)},
    updatePhoto(photo: File) {debugger
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<IStatusProfile>("profile/photo/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)},
}