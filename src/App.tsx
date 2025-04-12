import { ToastContainer } from 'react-toastify'
import useRouteCompenent from './hooks/useRouteComponent'

const App = () => {
    const routeComponent = useRouteCompenent()

    return (
        <>
            {routeComponent}
            <ToastContainer newestOnTop />
        </>
    )
}

export default App
