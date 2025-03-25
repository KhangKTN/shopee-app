import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from '~/constant/path'
import { AppContext } from '~/contexts/app.context'
import HomeLayout from '~/layouts/HomeLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Login from '~/pages/Login'
import { ProductList } from '~/pages/ProductList'
import Profile from '~/pages/Profile/Profile'
import Register from '~/pages/Register'

const useRouteCompenent = () => {
    const { isAuthenticated } = useContext(AppContext)
    const ProtectedRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to={path.LOGIN} />
    }

    const RejectedRoute = () => {
        return isAuthenticated ? <Navigate to={path.HOME} /> : <Outlet />
    }

    const useRouteCompenent = useRoutes([
        {
            path: '',
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
                    path: path.PROFILE,
                    element: (
                        <HomeLayout>
                            <Profile />
                        </HomeLayout>
                    )
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
    ])

    return useRouteCompenent
}

export default useRouteCompenent
