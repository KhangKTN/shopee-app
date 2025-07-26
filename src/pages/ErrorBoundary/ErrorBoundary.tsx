import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import path from '~/constant/path'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1 className='mt-12 font-semibold text-red-600 text-xl text-center'>
                        Sorry... Something is wrong. Please try later!
                    </h1>
                    <Link
                        to={path.HOME}
                        className='block bg-primary hover:opacity-80 mx-auto mt-8 px-8 py-3.5 rounded w-fit text-white text-lg text-center'
                    >
                        Trở về trang chủ
                    </Link>
                </>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
