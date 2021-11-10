


export interface IContacts {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export interface IPhotosUser {
    small: null | string
    large: null | string
}

export interface IProfileUser {
    aboutMe: null | string
    contacts: IContacts
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    fullName: null | string
    userId: null | number
    photos: IPhotosUser
}


export interface ILoginMe {
    email: string
    login: string
    rememberMe: boolean
    captcha?: null | string
}

export interface IUser {
    id: number
    name: string
    status: string
    photos: IPhotosUser
    followed: boolean
}