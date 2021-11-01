import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfileUser} from "../../redux/profile";
import style from "./Profile.module.scss";


export const ProfileUser = React.memo(({id}) => {

        const dispatch = useDispatch();
        React.useEffect(() => {
            id != null && dispatch(getProfileUser(id));
        }, [id])

        const profile = useSelector(state => state.profileReducer);


        return (
            <div className={style.profile}>
                <div className={style.profile__img}>
                    <img src={profile.photos.large || '/images/avatar_icon.svg'} alt=""/>
                </div>
                <div><h1 className={style.title}>{profile.fullName}</h1></div>
                <div>
                    <div>
                        <b>Обо мне:</b>
                    </div>
                    <span>{profile.aboutMe || "Напишите о себе!"}</span>
                </div>
                {profile.lookingForAJob != null &&
                <div className={style.job}>
                    <div><b>В поиске работы: {profile.lookingForAJob ? "Да" : "Нет"}</b></div>
                    <div>
                        <div><b>Описание будующей работы:</b></div>
                        <span>{profile.lookingForAJobDescription}</span>
                    </div>
                </div>
                }
                <div className={style.contact}>
                    <div><h4>Контакты:</h4></div>
                    <div><b>Facebook: </b><span> {profile.contacts.facebook}</span></div>
                    <div><b>Website: </b><span>{profile.contacts.website}</span></div>
                    <div><b>VK: </b><span>{profile.contacts.vk}</span></div>
                    <div><b>Twitter: </b><span>{profile.contacts.twitter}</span></div>
                    <div><b>Instagram: </b><span>{profile.contacts.instagram}</span></div>
                    <div><b>YouTube: </b><span>{profile.contacts.youtube}</span></div>
                    <div><b>GitHub: </b><span>{profile.contacts.github}</span></div>
                    <div><b>MainLink: </b><span>{profile.contacts.mainLink}</span></div>

                </div>
            </div>
        )
    }
);