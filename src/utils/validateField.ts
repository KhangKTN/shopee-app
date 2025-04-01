import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as Yup from 'yup'

/**
 * Define schema object use Yup
 */
export const registerSchema = Yup.object({
    email: Yup.string()
        .email('Email định dạng không hợp lệ')
        .trim()
        .required('Email không được để trống')
        .min(5, 'Độ dài tối thiểu 5 kí tự')
        .max(160, 'Độ dài tối đa 160 kí tự'),
    password: Yup.string()
        .required('Mật khẩu không được để trống')
        .trim()
        .min(6, 'Độ dài tối thiểu 6 kí tự')
        .max(160, 'Độ dài tối đa 160 kí tự'),
    confirm_password: Yup.string()
        .required('Xác nhận Mật khẩu không được để trống')
        .trim()
        .min(6, 'Độ dài tối thiểu 6 kí tự')
        .max(160, 'Độ dài tối đa 160 kí tự')
        .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không trùng khớp')
}).required()
/**
 * Export type schemas
 */
export type RegisterSchema = Yup.InferType<typeof registerSchema>

export const loginSchema = registerSchema.omit(['confirm_password'])
/**
 * Export type schemas
 */
export type LoginSchema = Yup.InferType<typeof loginSchema>

export const priceFilterSchema = Yup.object({
    min_price: Yup.string()
        .test('min_price', 'Chỉ được nhập số', (value) => {
            if (!value) return true
            return /^\d+$/.test(value)
        })
        .test('min_max_price', 'Giá tối thiểu không được lớn hơn giá tối đa', function (minPrice) {
            const maxPrice = this.parent.max_price
            if (!minPrice || !maxPrice) {
                return true
            }
            return Number(minPrice) <= Number(maxPrice)
        }),
    max_price: Yup.string().test('max_price', 'Chỉ được nhập số', (value) => {
        if (!value) return true
        return /^\d+$/.test(value)
    })
})
export type PriceFilterSchema = Yup.InferType<typeof priceFilterSchema>

/**
 * Define rules for form input
 * Use what is available in the react-hook-form library
 */
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules = (getValues?: UseFormGetValues<any>): Rules => ({
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
