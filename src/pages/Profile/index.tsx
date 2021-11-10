import React from "react"
import {getProfileUser, getStatusProfile, setProfileUser} from "../../redux/profile-reducer"
import style from "./Profile.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {IProfileUser} from "../../type/interface"
import {ProfileDataForm} from "../../components/ProfileData/ProfileForm/ProfileForm"
import {ProfileData} from "../../components/ProfileData/ProfileData"
import {useParams} from "react-router-dom";
import {ProfilePhoto} from "../../components/ProfileData/ProfilePhoto";
import {ProfileStatus} from "../../components/ProfileData/ProfileStatus";
import {PreLoader} from "../../components/common/PreLoader/PreLoader";

export interface UserItemUserParams {
    id: string
}

export interface IProfileUserProps {
    id?: number | null
}


export const ProfileUser: React.FC<IProfileUserProps> = React.memo(({id}) => {
        const params = useParams<UserItemUserParams>()

        const profile = useAppSelector(state => state.profileSlice)
        const [editorProfile, setEditorProfile] = React.useState(false)
        const [status, setStatus] = React.useState(profile.status)

        const dispatch = useAppDispatch()

        React.useEffect(() => {
            if (id != null) {
                dispatch(getProfileUser(id))
                dispatch(getStatusProfile(id))
            } else {
                dispatch(getProfileUser(Number(params.id)))
                dispatch(getStatusProfile(Number(params.id)))
            }
        }, [id, params.id])

        React.useEffect(() => {
            setStatus(profile.status)
        }, [profile.status])

        const editorMode = () => {
            setEditorProfile(!editorProfile)
        }

        const onSubmit = (formData: IProfileUser) => {
            dispatch(setProfileUser(formData)).then(
                () => {
                    setEditorProfile(!editorProfile)
                }
            )
        }
        if (profile.isLoading) {
            return <PreLoader/>
        }
        return (
            <div className={style.profile}>
                <ProfilePhoto id={id}/>
                <ProfileStatus id={id} status={status} setStatus={setStatus}/>
                {!editorProfile ? <ProfileData editorMode={editorMode} id={id} profile={profile.user}/> :
                    <ProfileDataForm onSubmit={onSubmit} initialValues={profile.user} profile={profile.user}/>}
            </div>
        )
    }
)



