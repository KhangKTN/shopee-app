import { ToastContainer } from "react-toastify"
import useRouteCompenent from "./hooks/useRouteCompenent"

const App = () => {
    const routeComponent = useRouteCompenent()

    return (
        <div>
            {routeComponent}
            <ToastContainer theme='dark' newestOnTop />
        </div>
    )
}

export default App
