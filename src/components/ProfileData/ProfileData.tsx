import style from "../../pages/Profile/Profile.module.scss";
import React from "react";
import {IContacts, IProfileUser} from "../../type/interface";


interface IProfileDataProps {
    id: number | null | undefined
    profile: IProfileUser
    editorMode: () => void
}

export const ProfileData: React.FC<IProfileDataProps> = ({profile, editorMode, id}) => {
    return (
        <>
            <div><h1 className={style.title}>{profile.fullName}</h1></div>
            {id && <button onClick={editorMode}>Редакторовать профиль</button>}
            <div>
                <div>
                    <b>Обо мне:</b>
                </div>
                <span>{profile.aboutMe || "Напишите о себе!"}</span>
            </div>
            {profile.lookingForAJob != null &&
            <div className={style.job}>
                <div><b>В поиске работы: {profile.lookingForAJob ? "Да" : "Нет"}</b></div>
                {profile.lookingForAJob &&
                <div>
                    <div><b>Мои профессиональные навыки:</b></div>
                    <span>{profile.lookingForAJobDescription}</span>
                </div>}
            </div>
            }
            <div className={style.contact}>
                <div><h4>Контакты:</h4></div>
                {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key}
                                                                   contactValue={profile.contacts[key as keyof IContacts]}/>)}
            </div>
        </>
    )
}


interface ContactsPropsType {
    contactTitle: string
    contactValue: string | null
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}