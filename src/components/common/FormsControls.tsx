import React from "react"
import style from "./FormsControls.module.scss"
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"

interface FormControlProps {
    meta: WrappedFieldMetaProps
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><input className={style.input__form} {...input} {...restProps}/></FormControl>
}

const FormControl: React.FC<FormControlProps> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={style.form__control + " " + (hasError ? style.error: "")}>
            <div>
                {children}
            </div>
            {hasError && <span className={style.form__control}>{error}</span>}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>