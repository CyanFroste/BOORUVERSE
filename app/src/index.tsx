import * as React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './App'
import { HelmetProvider } from 'react-helmet-async'
import './styles/main.css'

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
