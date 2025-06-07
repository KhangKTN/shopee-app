import CartSearch from '~/components/CartSearch'
import Footer from '~/components/Footer'
import NavHeader from '~/components/Header/NavHeader'
import CommonHeader from '~/components/RegisterHeader'
import { appHeight } from '~/constant/app'

const CartLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavHeader />
            <CommonHeader
                title='Giỏ hàng'
                leftComponent={<CartSearch />}
                isShowBorder
                titleClass='text-primary text-2xl'
            />
            <div
                style={{
                    minHeight: `calc(100vh - ${appHeight.navHeader + appHeight.header + appHeight.footer}px)`
                }}
                className='grid'
            >
                {children}
            </div>
            <Footer />
        </>
    )
}

export default CartLayout
