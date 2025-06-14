import { Link } from 'react-router-dom'
import path from '~/constant/path'

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-y-4'>
            <img className='size-32' src='https://cdn-icons-png.flaticon.com/512/3815/3815529.png' alt='not_found' />
            <h2 className='font-medium text-lg'>
                Bạn đang truy cập trang không tồn tại. Vui lòng thử lại sau hoặc về Trang chủ
            </h2>
            <Link
                to={path.HOME}
                className='hover:bg-primary/20 px-4 py-2 border-[1px] border-primary rounded text-primary'
            >
                Trang Chủ
            </Link>
        </div>
    )
}

export default NotFound
