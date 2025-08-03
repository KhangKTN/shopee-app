import React from 'react'
import { useMatch } from 'react-router-dom'
import Footer from '~/components/Footer'
import CommonHeader from '~/components/RegisterHeader'
import { appHeight } from '~/constants/app.constant'

interface Prop {
    children?: React.ReactNode
}

// Layout use for Register and Login page
const RegisterLayout = ({ children }: Prop) => {
    const match = useMatch('/register')

    return (
        <main>
            <CommonHeader title={match ? 'Đăng kí' : 'Đăng nhập'} leftComponent={<a href='http://'>Help?</a>} />
            <div
                style={{ minHeight: `calc(100vh - ${appHeight.header}px - ${appHeight.footer}px)` }}
                className='flex flex-col bg-[#ef532a] w-full'
            >
                <div className='flex flex-grow items-center bg-[url(https://down-vn.img.susercontent.com/file/sg-11134004-7rff9-m47h5vo9qfr552)] bg-cover bg-no-repeat bg-center mx-auto w-[1040px] h-full'>
                    <div className='grid grid-cols-5 w-full'>
                        <div className='col-span-2 col-start-4'>{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default RegisterLayout
