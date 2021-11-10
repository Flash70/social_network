import React from "react"
import style from "../../pages/Users/Users.module.scss"
import {IUser} from "../../type/interface"
import {NavLink} from "react-router-dom"
import {Chip} from "@mui/material"
import DoneIcon from '@mui/icons-material/Done'

interface IUserProps {
    subscribe: (id: number) => void
    unsubscribe: (id: number) => void
}

export const User: React.FC<IUser & IUserProps> = React.memo(({
                                                                  name, id, status, photos, followed,
                                                                  subscribe, unsubscribe
                                                              }) => {


        return (
            <div className={style.block__user}>
                <div className={style.user__img}>
                    <img src={photos.large || '/images/avatar_icon.svg'} alt=""/>
                </div>
                <div className={style.user__name}><NavLink to={"/profile" + id}><h1>{name}</h1></NavLink></div>
                <div className={style.status}><span>{status}</span></div>
                {
                    followed
                        ? <Chip className={style.user__btn} color="success"
                                label={"Отписаться"} deleteIcon={<DoneIcon/>} onDelete={() => unsubscribe(id)}/>
                        : <Chip className={style.user__btn} onClick={() => subscribe(id)} color="warning"
                                label={"Подписаться"}/>
                }
            </div>
        )
    }
)