import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'
import HomeLayout from '~/layouts/HomeLayout/HomeLayout'
import RegisterLayout from '~/layouts/RegisterLayout/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/Profile/Profile'
import Register from '~/pages/Register'


const useRouteCompenent = () => {
    const { isAuthenticated } = useContext(AppContext) 
    const ProtectedRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    }
    
    const RejectedRoute = () => {
        return isAuthenticated ? <Navigate to='/' /> : <Outlet />
    }

    const useRouteCompenent = useRoutes([
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: '/login',
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: '/register',
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                }
            ]
        },
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
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
            path: '/',
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