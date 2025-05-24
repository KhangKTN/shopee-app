import React from 'react'
import { useMatch } from 'react-router-dom'
import Footer from '~/components/Footer'
import CommonHeader from '~/components/RegisterHeader'

interface Prop {
    children?: React.ReactNode
}

// Layout use for Register and Login page
const RegisterLayout = ({ children }: Prop) => {
    const match = useMatch('/register')

    return (
        <main>
            <CommonHeader title={match ? 'Đăng kí' : 'Đăng nhập'} leftComponent={<a href='http://'>Help?</a>} />
            <div className='bg-[#ef532a] w-full h-auto min-h-fit'>
                <div className='flex items-center bg-[url(https://down-vn.img.susercontent.com/file/sg-11134004-7rff9-m47h5vo9qfr552)] bg-cover bg-no-repeat bg-center mx-auto w-[1040px] h-[600px]'>
                    <div className='grid grid-cols-5 my-auto w-full'>
                        <div className='col-span-2 col-start-4'>{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default RegisterLayout
