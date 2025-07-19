import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
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
            <HelmetProvider>{routeComponent}</HelmetProvider>
            <ToastContainer newestOnTop limit={1} />
        </>
    )
}

export default App
