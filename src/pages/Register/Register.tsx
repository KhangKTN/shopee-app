import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import path from '~/constant/path'
import { isAxiosUnprocessaleEntityError } from '~/utils/helper'
import { registerSchema, RegisterSchema } from '~/utils/validateField'

const Register = () => {
    const navigate = useNavigate()
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors }
    } = useForm<RegisterSchema>({ resolver: yupResolver(registerSchema) })

    const registerMutation = useMutation({
        mutationFn: (body: Pick<RegisterSchema, 'email' | 'password'>) => authApi.registerAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        const registerData = _.omit(data, ['confirm_password'])
        registerMutation.mutate(registerData, {
            onSuccess: () => {
                navigate(path.LOGIN)
            },
            onError: (error) => {
                if (isAxiosUnprocessaleEntityError<ErrorResponse<Omit<RegisterSchema, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (!formError) {
                        return
                    }
                    for (const i in formError) {
                        setError(i as keyof Omit<RegisterSchema, 'confirm_password'>, {
                            message: formError[i as keyof Omit<RegisterSchema, 'confirm_password'>]
                        })
                    }
                }
            }
        })
    })

    return (
        <form onSubmit={onSubmit} className='bg-white shadow-sm ml-auto p-8 rounded'>
            <div className='mb-6'>
                <h6 className='text-2xl'>Đăng ký</h6>
            </div>
            <Input
                name='email'
                classNameDiv='mt-5'
                register={register}
                // rules={rules().email} // Form use yupResolver then no need use rule
                type='text'
                placeholder='Email/Số điện thoại/Tên đăng nhập'
                errorMsg={errors?.email?.message}
                autoComplete={'email'}
            />
            <Input
                name='password'
                classNameDiv='mt-5'
                register={register}
                type='password'
                placeholder='Mật khẩu'
                errorMsg={errors?.password?.message}
                autoComplete={'on'}
            />
            <Input
                name='confirm_password'
                classNameDiv='mt-5'
                register={register}
                type='password'
                placeholder='Xác nhận mật khẩu'
                errorMsg={errors?.confirm_password?.message}
                autoComplete='on'
            />
            <div className='mb-3 w-full'>
                <Button
                    children='Tiếp theo'
                    className='mt-5 px-4 py-2 rounded w-full uppercase'
                    isLoading={registerMutation.isPending}
                    disabled={registerMutation.isPending}
                />
            </div>
            <div className='flex items-center gap-x-3 my-5'>
                <div className='flex-1 bg-slate-300 h-[1px]'></div>
                <span className='text-slate-300 text-xs uppercase'>Hoặc</span>
                <div className='flex-1 bg-slate-300 h-[1px]'></div>
            </div>
            <div className='gap-x-5 grid grid-cols-2 mb-6'>
                <button className='hover:bg-gray-100 px-4 py-2 border-[1px] border-gray-400 rounded transition'>
                    Facebook
                </button>
                <button className='hover:bg-gray-100 px-4 py-2 border-[1px] border-gray-400 rounded transition'>
                    Google
                </button>
            </div>
            <p className='text-[.875rem] text-center'>
                Bằng việc đăng kí, bạn đã đồng ý với Shopee về <br /> Điều khoản & Bảo mật
            </p>
            <p className='mt-6 text-[.875rem] text-gray-400 text-center'>
                Bạn đã có tài khoản?{' '}
                <Link className='font-medium text-primary' to={path.LOGIN}>
                    Đăng nhập
                </Link>
            </p>
        </form>
    )
}

export default Register
