import { appHeight } from '~/constants/app.constant'

const Footer = () => {
    return (
        <footer style={{ height: appHeight.footer }} className='bg-[#fbfbfb] py-4 border-primary border-t-4 w-full'>
            <div className='mx-auto w-[80%] max-w-7xl'>
                <div className='gap-4 grid grid-cols-1 lg:grid-cols-3'>
                    <div className='lg:col-span-1'>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
                    <div className='lg:col-span-2 text-center'>
                        Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam Philippines Brazil México
                        Colombia Chile Đài Loan
                    </div>
                </div>
                <div></div>
            </div>
        </footer>
    )
}

export default Footer
