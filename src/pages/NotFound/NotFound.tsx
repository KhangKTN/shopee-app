import { Link } from 'react-router-dom'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { appHeight } from '~/constant/app'
import path from '~/constant/path'

const NotFound = () => {
    return (
        <>
            <Header />
            <main
                style={{
                    minHeight: `calc(100vh - ${appHeight.navHeader + appHeight.header + appHeight.footer}px)`
                }}
                className='grid'
            >
                <div className='flex flex-col items-center gap-y-4 my-auto'>
                    <img
                        className='mx-auto size-32'
                        src='https://cdn-icons-png.flaticon.com/512/3815/3815529.png'
                        alt='not_found'
                    />
                    <h2 className='font-medium text-lg text-center'>
                        Bạn đang truy cập trang không tồn tại. Vui lòng thử lại sau hoặc về Trang chủ
                    </h2>
                    <Link
                        to={path.HOME}
                        className='hover:bg-primary/20 mx-auto px-4 py-2 border-[1px] border-primary rounded size-fit text-primary'
                    >
                        Trang Chủ
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default NotFound
