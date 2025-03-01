import { ToastContainer } from "react-toastify"
import useRouteCompenent from "./hooks/useRouteComponent"

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
