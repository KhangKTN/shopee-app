import React from 'react'
import Footer from '~/components/Footer'
import RegisterHeader from '~/components/Header/RegisterHeader'

interface Prop {
    children?: React.ReactNode
}

const RegisterLayout = ({ children }: Prop) => {
    return (
        <div>
            <RegisterHeader />
            <div className='bg-[#ef532a] w-full h-auto min-h-fit'>
                <div className='mx-auto w-[1040px] h-[600px] flex items-center bg-[url(https://down-vn.img.susercontent.com/file/sg-11134004-7rff9-m47h5vo9qfr552)] bg-center bg-cover bg-no-repeat'>
                    <div className='w-full grid grid-cols-5 my-auto'>
                        <div className='col-span-3 bg-transparent'></div>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterLayout