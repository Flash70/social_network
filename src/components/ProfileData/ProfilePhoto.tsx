import style from "../../pages/Profile/Profile.module.scss";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPhotoProfile} from "../../redux/profile-reducer";
import {IProfileUserProps} from "../../pages/Profile";


export const ProfilePhoto: React.FC<IProfileUserProps> = ({id}) => {
    const profile = useAppSelector(state => state.profileSlice)

    const dispatch = useAppDispatch()

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files
        if (file != null) {
            if (id != null) {
                dispatch(setPhotoProfile(file[0], id))
            }
        }
    }

    return (
        <>
            <div className={style.profile__img}>
                <img src={profile.user.photos.large || '/images/avatar_icon.svg'} alt=""/>
            </div>
            {id && <div>
                <b>Обновить фотографию: </b><input type={"file"} onChange={handleChangeFile}/>
            </div>}
        </>
    )
}