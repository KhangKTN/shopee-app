import useRouteCompenent from "./hooks/useRouteCompenent"

const App = () => {
    const routeComponent = useRouteCompenent()

    return (
        <div>
            {routeComponent}
        </div>
    )
}

export default App
