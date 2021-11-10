import {instance} from "./api";


export interface securityType {
    url: string
}

export const securityAPI = {
    security() {
        return instance.get<securityType>("security/get-captcha-url").then(res => res.data)
    }
}