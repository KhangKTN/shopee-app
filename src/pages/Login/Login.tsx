import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { rules } from '~/utils/validateField';

interface FormData {
    email: string,
    password: string
}

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>() 

    const onSubmit = handleSubmit(data => {
        console.log(data);
    })

    return (
        <form onSubmit={onSubmit} className='col-span-2 p-8 bg-white rounded shadow-sm'>
            <div className='mb-6'>
                <h6 className='text-2xl'>Sign in</h6>
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
                    type='password'
                    placeholder='Mật khẩu'
                    {...register('password', rules().password)}
                />
                <p className='error'>{errors?.password?.message}</p>
            </div>
            <div className='w-full mb-3'>
                <button className='w-full uppercase bg-primary py-2 px-4 text-white rounded'>Đăng nhập</button>
            </div>
            <div className='flex justify-between'>
                <Link className='text-blue-800' to=''>
                    Quên mật khẩu?
                </Link>
                <Link className='text-blue-800' to=''>
                    Đăng nhập với SMS
                </Link>
            </div>
            <div className='my-3'>Hoac</div>
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
                    <Link className='text-primary' to='/register'>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default Login
