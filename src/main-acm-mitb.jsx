import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AcmMitbApp from './AcmMitbApp.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AcmMitbApp />
    </StrictMode>,
)
