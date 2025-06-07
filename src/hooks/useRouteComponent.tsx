import { useContext } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom'
import path from '~/constant/path'
import { AppContext } from '~/contexts/app.context'
import CartLayout from '~/layouts/CartLayout'
import HomeLayout from '~/layouts/HomeLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Cart from '~/pages/Cart'
import Login from '~/pages/Login'
import ProductDetail from '~/pages/ProductDetail'
import { ProductList } from '~/pages/ProductList'
import Register from '~/pages/Register'
import UserLayout from '~/pages/User'
import ChangePassword from '~/pages/User/ChangePassword'
import HistoryPurchase from '~/pages/User/HistoryPurchase'
import Profile from '~/pages/User/Profile'

const useRouteCompenent = () => {
    const { isAuthenticated } = useContext(AppContext)

    const ProtectedRoute = () => {
        const location = useLocation()
        const returnUri = location.pathname

        return isAuthenticated ? <Outlet /> : <Navigate to={`${path.LOGIN}?return_uri=${returnUri}`} />
    }

    const RejectedRoute = () => {
        return isAuthenticated ? <Navigate to={path.HOME} /> : <Outlet />
    }

    const useRouteCompenent = useRoutes([
        {
            path: path.HOME,
            element: <RejectedRoute />,
            children: [
                {
                    path: path.LOGIN,
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: path.REGISTER,
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                }
            ]
        },
        {
            path: path.HOME,
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.CART,
                    element: (
                        <CartLayout>
                            <Cart />
                        </CartLayout>
                    )
                },
                {
                    path: path.USER,
                    element: (
                        <HomeLayout>
                            <UserLayout />
                        </HomeLayout>
                    ),
                    children: [
                        { element: <Profile />, index: true },
                        { path: path.PROFILE, element: <Profile /> },
                        { path: path.HISTORY_PURCHASES, element: <HistoryPurchase /> },
                        { path: path.CHANGE_PASSWORD, element: <ChangePassword /> }
                    ]
                }
            ]
        },
        {
            index: true,
            path: path.HOME,
            element: (
                <HomeLayout>
                    <ProductList />
                </HomeLayout>
            )
        },
        {
            path: path.PRODUCT_DETAIL,
            element: (
                <HomeLayout>
                    <ProductDetail />
                </HomeLayout>
            )
        }
    ])

    return useRouteCompenent
}

export default useRouteCompenent
