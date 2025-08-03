import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import path from '~/constants/path.constant'
import { AppContext } from '~/contexts/app.context'
import { isAxiosUnprocessaleEntityError } from '~/utils/axios.util'
import { loginSchema, LoginSchema } from '~/utils/validate.util'

const Login = () => {
    const { setAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const returnUri = params.get('return_uri')

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
                setTimeout(() => {
                    navigate(returnUri ? returnUri : path.HOME)
                }, 150)
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
        <>
            <Helmet>
                <title>Shoppe Việt Nam | Đăng nhập</title>
                <meta name='description' content='Đăng nhập vào Shopee' />
            </Helmet>
            <form onSubmit={onSubmit} className='bg-white shadow-sm p-8 rounded w-full'>
                <div className='mb-6'>
                    <h6 className='text-2xl'>Đăng nhập</h6>
                </div>
                <Input
                    name='email'
                    classNameDiv='mt-5'
                    register={register}
                    type='text'
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                    errorMsg={errors?.email?.message}
                    autoComplete={'email'}
                />
                <Input
                    name='password'
                    classNameDiv='mt-6'
                    register={register}
                    type='password'
                    placeholder='Mật khẩu'
                    errorMsg={errors?.password?.message}
                    autoComplete={'on'}
                />
                <div className='mt-8 w-full'>
                    <Button
                        children='Đăng nhập'
                        className='px-4 py-2 rounded w-full uppercase'
                        isLoading={loginMutation.isPending}
                        disabled={loginMutation.isPending}
                    />
                </div>
                <p className='mt-5 font-medium text-[.875rem] text-gray-400 text-center'>
                    Bạn mới biết đến Shopee?{' '}
                    <Link className='text-primary' to={path.REGISTER}>
                        Đăng ký
                    </Link>
                </p>
            </form>
        </>
    )
}

export default Login
