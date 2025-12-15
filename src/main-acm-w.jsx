import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AcmWApp from './AcmWApp.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AcmWApp />
    </StrictMode>,
)
