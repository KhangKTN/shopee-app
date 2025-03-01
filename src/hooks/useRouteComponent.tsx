import { useRoutes } from 'react-router-dom'
import HomeLayout from '~/layouts/HomeLayout/HomeLayout'
import RegisterLayout from '~/layouts/RegisterLayout/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Register from '~/pages/Register'

const useRouteCompenent = () => {
    const useRouteCompenent = useRoutes([
        {
            path: '/',
            element: (
                <HomeLayout>
                    <ProductList />
                </HomeLayout>
            )
        },
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
    ])
    
    return useRouteCompenent
}

export default useRouteCompenent
