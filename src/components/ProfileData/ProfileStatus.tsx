import style from "../../pages/Profile/Profile.module.scss";
import React from "react";
import {setStatusProfile} from "../../redux/profile-reducer";
import {useAppDispatch} from "../../hooks/redux";

interface IProfileStatus {
    status: string
    setStatus: (value: string) => void
    id?: number | null
}

export const ProfileStatus: React.FC<IProfileStatus> = ({status, setStatus, id}) => {
    const dispatch = useAppDispatch()
    const [editorStatus, setEditorStatus] = React.useState(false)

    const onClickStatus = () => {
        if (id != null) {
            setEditorStatus(!editorStatus)
        }
    }
    const OnBlurStatusEditor = () => {
        setEditorStatus(!editorStatus)
        dispatch(setStatusProfile(status))
    }
    const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }
    return (
        <>
            <div className={style.status} onDoubleClick={onClickStatus} onBlur={OnBlurStatusEditor}>
                <b>Статус: </b>
                {!editorStatus ? <span>{status}</span> :
                    <input value={status} onChange={onChangeStatus} autoFocus type="text"/>}
            </div>
        </>
    )
}