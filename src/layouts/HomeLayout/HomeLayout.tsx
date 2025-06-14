import React from 'react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { appHeight } from '~/constant/app'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main
                style={{
                    minHeight: `calc(100vh - ${appHeight.navHeader + appHeight.header + appHeight.footer}px)`
                }}
                className='grid'
            >
                {children}
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout
