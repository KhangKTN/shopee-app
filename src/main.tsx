import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './contexts/app.context'
import './index.css'

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <App />
            </AppProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </BrowserRouter>
)
