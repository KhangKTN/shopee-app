import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppContext } from './contexts/app.context'
import useRouteCompenent from './hooks/useRouteComponent'
import { CLEAR_TOKEN, localStorageEvent } from './utils/authUtil'

const App = () => {
    const routeComponent = useRouteCompenent()
    const { setAuthenticated, setProfile } = useContext(AppContext)

    useEffect(() => {
        const handleResetContext = () => {
            setAuthenticated(false)
            setProfile(null)
        }

        localStorageEvent.addEventListener(CLEAR_TOKEN, handleResetContext)

        return () => {
            localStorageEvent.removeEventListener(CLEAR_TOKEN, handleResetContext)
        }
    }, [setAuthenticated, setProfile])

    return (
        <>
            {routeComponent}
            <ToastContainer newestOnTop />
        </>
    )
}

export default App
