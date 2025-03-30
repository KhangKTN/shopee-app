import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import path from '~/constant/path'
import { AppContext } from '~/contexts/app.context'
import { isAxiosUnprocessaleEntityError } from '~/utils/helper'
import { loginSchema, LoginSchema } from '~/utils/validateField'

const Login = () => {
    const { setAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors }
    } = useForm<LoginSchema>({ resolver: yupResolver(loginSchema) })

    const loginMutation = useMutation({
        mutationFn: (body: LoginSchema) => authApi.loginAccount(body)
    })

    const onSubmit = handleSubmit((loginData) => {
        loginMutation.mutate(loginData, {
            onSuccess: (resData) => {
                setAuthenticated(true)
                setProfile(resData.data.data.user)
                navigate(path.HOME)
            },
            onError: (error) => {
                if (isAxiosUnprocessaleEntityError<ErrorResponse<LoginSchema>>(error)) {
                    const formError = error.response?.data.data
                    if (!formError) {
                        return
                    }
                    for (const i in formError) {
                        setError(i as keyof LoginSchema, {
                            message: formError[i as keyof LoginSchema]
                        })
                    }
                }
            }
        })
    })

    return (
        <form onSubmit={onSubmit} className='bg-white shadow-sm p-8 rounded w-full'>
            <div className='mb-6'>
                <h6 className='text-2xl'>Đăng nhập</h6>
            </div>
            <Input
                name='email'
                className='mt-5'
                register={register}
                type='text'
                placeholder='Email/Số điện thoại/Tên đăng nhập'
                errorMsg={errors?.email?.message}
                autoComplete={'email'}
            />
            <Input
                name='password'
                className='mt-5'
                register={register}
                type='password'
                placeholder='Mật khẩu'
                errorMsg={errors?.password?.message}
                autoComplete={'on'}
            />
            <div className='mb-3 w-full'>
                <Button
                    children='Đăng nhập'
                    className='mt-5 px-4 py-2 rounded w-full uppercase'
                    isLoading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                />
            </div>
            <div className='flex justify-between mb-3'>
                <Link className='text-blue-800' to=''>
                    Quên mật khẩu?
                </Link>
                <Link className='text-blue-800' to=''>
                    Đăng nhập với SMS
                </Link>
            </div>
            <div className='flex items-center gap-x-3 my-6'>
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
            <p className='font-medium text-[.875rem] text-gray-400 text-center'>
                Bạn mới biết đến Shopee?{' '}
                <Link className='text-primary' to={path.REGISTER}>
                    Đăng ký
                </Link>
            </p>
        </form>
    )
}

export default Login
