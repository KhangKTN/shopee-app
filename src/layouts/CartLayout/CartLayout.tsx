import CartSearch from '~/components/CartSearch'
import Footer from '~/components/Footer'
import NavHeader from '~/components/Header/NavHeader'
import CommonHeader from '~/components/RegisterHeader'

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
            {children}
            <Footer />
        </>
    )
}

export default CartLayout
