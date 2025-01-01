import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from '~/utils/validateField'

interface FormData {
    email: string,
    password: string,
    confirm_password: string
}

const Register = () => {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors }
    } = useForm<FormData>() 

    const onSubmit = handleSubmit(data => {
        console.log(data);
        // if (getValues('password') !== getValues('confirm_password')) {
        //     setError('confirm_password', { message: 'Mật khẩu xác nhận không trùng khớp' }, { shouldFocus: true })
        // }
    })

    return (
        <form onSubmit={onSubmit} className='col-span-2 p-8 bg-white rounded shadow-sm'>
            <div className='mb-6'>
                <h6 className='text-2xl'>Đăng ký</h6>
            </div>
            <div className='w-full mb-1'>
                <input
                    className='w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow'
                    type='text'
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                    {...register('email', rules().email)}
                    autoFocus
                />
                <p className='error'>{errors?.email?.message}</p>
            </div>
            <div className='w-full mb-1'>
                <input
                    className='w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow'
                    type='text'
                    placeholder='Mật khẩu'
                    {...register('password', rules().password)}
                />
                <p className='error'>{errors?.password?.message}</p>
            </div>
            <div className='w-full mb-1'>
                <input
                    className='w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow'
                    type='text'
                    placeholder='Xác nhận mật khẩu'
                    {...register('confirm_password', rules(getValues).confirm_password)}
                />
                <p className='error'>{errors?.confirm_password?.message}</p>
            </div>
            <div className='w-full mb-3'>
                <button className='w-full uppercase bg-primary py-2 px-4 text-white rounded'>Tiếp theo</button>
            </div>
            <div className='my-5'>Hoac</div>
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
                    <Link className='text-primary font-medium' to='/login'>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Register
