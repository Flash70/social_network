type validations = (value: string) => string | undefined

export const required: validations = (value) => value ? undefined : "Пожалуйста, заполните  это поле";

export const email: validations = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Не правильный email"
        : undefined;