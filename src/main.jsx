import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { StoreProvider } from './hooks/useGlobalReducer'
import AppRoutes from "./routes"

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <AppRoutes />
            </StoreProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
