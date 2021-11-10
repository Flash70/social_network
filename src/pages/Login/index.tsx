import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {email, required} from "../../utils/validation"
import React from "react"
import {useAppDispatch} from "../../hooks/redux"
import {setAuthMeLogin} from "../../redux/auth-reducer"
import {ILoginMe} from "../../type/interface"
import style from "./Login.module.scss"
import {Input} from "../../components/common/FormsControls";

interface LoginFormProps {
    captcha: string | undefined
    messages: Array<string>
}


export const LoginForm: React.FC<InjectedFormProps<ILoginMe, LoginFormProps> & LoginFormProps> = ({
                                                                                                      handleSubmit,
                                                                                                      captcha,
                                                                                                      messages,
                                                                                                      error
                                                                                                  }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={style.form}>

                        <Field placeholder={"Email"} name={"email"} validate={[required, email]} component={Input}/>


                        <Field placeholder={"Password"} name={"password"} type={"password"} validate={[required]}
                               component={Input}/>

                    <div className={style.remember}>
                        <Field name={"rememberMe"} type={"checkbox"} component={"input"}/>remember me
                    </div>
                </div>
                {error && <div className={style.error}><span>{error}</span></div>}
                {captcha && <>
                    <div>
                        <img src={captcha} alt="captcha"/>
                    </div>
                    <div>
                        <Field name={"captcha"} type={"text"} component={Input}/>
                    </div>
                </>

                }
                <div>
                    <button>Login</button>
                </div>
            </form>
        </>

    )
}

const LoginReduxForm = reduxForm<ILoginMe, LoginFormProps>({form: "login"})(LoginForm)


export const Login: React.FC<LoginFormProps> = ({messages, captcha}) => {

    const dispatch = useAppDispatch()


    const onSubmit = (formData: ILoginMe) => {
        dispatch(setAuthMeLogin(formData))
    }
    return (
        <>
            <div><h1>Login</h1></div>
            <div>
                <LoginReduxForm onSubmit={onSubmit} messages={messages} captcha={captcha}/>
            </div>

        </>
    )
}