import { UseFormGetValues } from "react-hook-form"

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules = (getValues?: UseFormGetValues<any>) => ({
    email: {
        required: { value: true, message: 'Email là trường bắt buộc' },
        pattern: {
            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            message: 'Email định dạng không hợp lệ'
        }
    },
    password: {
        required: { value: true, message: 'Mật khẩu là bắt buộc' },
        minLength: { value: 6, message: 'Độ dài tối thiểu 6 kí tự' },
        maxLength: { value: 160, message: 'Độ dài tối đa 160 kí tự' }
    },
    confirm_password: {
        required: { value: true, message: 'Nhập lại Mật khẩu là bắt buộc' },
        minLength: { value: 6, message: 'Độ dài tối thiểu 6 kí tự' },
        maxLength: { value: 160, message: 'Độ dài tối đa 160 kí tự' },
        validate:
            typeof getValues === 'function'
                ? (v: string) => v === getValues('password') || 'Mật khẩu xác nhận không trùng khớp'
                : undefined
    }
})