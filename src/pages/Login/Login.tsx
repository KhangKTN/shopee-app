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

    const onSubmit = handleSubmit(loginData => {
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
        <form onSubmit={onSubmit} className='col-span-2 p-8 bg-white rounded shadow-sm'>
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
            <div className='w-full mb-3'>
                <Button
                    children='Đăng nhập'
                    className='w-full mt-5 uppercase py-2 px-4 rounded'
                    isLoading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                />
            </div>
            <div className='mb-3 flex justify-between'>
                <Link className='text-blue-800' to=''>
                    Quên mật khẩu?
                </Link>
                <Link className='text-blue-800' to=''>
                    Đăng nhập với SMS
                </Link>
            </div>
            <div className='my-6 flex items-center gap-x-3'>
                <div className='h-[1px] bg-slate-300 flex-1'></div>
                <span className='text-slate-300 uppercase text-xs'>Hoặc</span>
                <div className='h-[1px] bg-slate-300 flex-1'></div>
            </div>
            <div className='grid grid-cols-2 gap-x-5 mb-6'>
                <button className='border-[1px] border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition'>
                    Facebook
                </button>
                <button className='border-[1px] border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition'>
                    Google
                </button>
            </div>
            <div className=''>
                <p className='text-center text-gray-300 font-medium text-[.875rem]'>
                    Bạn mới biết đến Shopee?{' '}
                    <Link className='text-primary' to={path.REGISTER}>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Login
