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
        mutationFn: (body: Omit<RegisterSchema, 'confirm_password'>) => authApi.registerAccount(body)
    })

    const onSubmit = handleSubmit(data => {
        const registerData = _.omit(data, ['confirm_password'])
        registerMutation.mutate(registerData, {
            onSuccess: () => {
                navigate(path.LOGIN)
            },
            onError: error => {
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
        <form onSubmit={onSubmit} className='col-span-2 p-8 bg-white rounded shadow-sm'>
            <div className='mb-6'>
                <h6 className='text-2xl'>Đăng ký</h6>
            </div>
            <Input
                name='email'
                className='mt-5'
                register={register}
                // rules={rules().email} // Form use yupResolver then no need use rule
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
            <Input
                name='confirm_password'
                className='mt-5'
                register={register}
                type='password'
                placeholder='Xác nhận mật khẩu'
                errorMsg={errors?.confirm_password?.message}
                autoComplete='on'
            />
            <div className='w-full mb-3'>
                <Button
                    children='Tiếp theo'
                    className='w-full mt-5 uppercase py-2 px-4 rounded'
                    isLoading={registerMutation.isPending}
                    disabled={registerMutation.isPending}
                />
            </div>
            <div className='my-5 flex items-center gap-x-3'>
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
            <p className='text-center text-[.875rem]'>
                Bằng việc đăng kí, bạn đã đồng ý với Shopee về <br /> Điều khoản & Bảo mật
            </p>
            <div className='mt-6'>
                <p className='text-center text-gray-300 text-[.875rem]'>
                    Bạn đã có tài khoản?{' '}
                    <Link className='text-primary font-medium' to={path.LOGIN}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Register
