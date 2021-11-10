import React from "react"
import style from "./ProfileForm.module.scss"
import {IProfileUser} from "../../../type/interface"
import {Input} from "../../common/FormsControls"
import {Field, InjectedFormProps, reduxForm} from "redux-form"


interface IProfileFormProps {
    profile: IProfileUser
}

const ProfileForm: React.FC<InjectedFormProps<IProfileUser, IProfileFormProps> & IProfileFormProps> = ({
                                                                                          handleSubmit,
                                                                                          profile,
                                                                                          error
                                                                                      }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Ваше имя</b>: <Field name={"fullName"} component={Input}/>
            </div>
            <div>
                <b>Обо мне</b>: <Field name={"aboutMe"} component={Input}/>
            </div>
            <div>
                <b>В поиске работы</b>: <Field name={"lookingForAJob"} type={"checkbox"} component={"input"}/>
            </div>

            <div>
                <b>Мои профессиональные навыки</b>: <Field name={"lookingForAJobDescription"} component={Input}/>
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={style.contact}>
                    {/* todo: create some solution for embedded objects */}
                    <b>{key}: <Field name={"contacts." + key} component={Input}/></b>
                </div>
            })}
            </div>
        </form>)
}

export const ProfileDataForm = reduxForm<IProfileUser, IProfileFormProps>({form: "edit-profile"})(ProfileForm)