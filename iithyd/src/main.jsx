import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import ElderDetails from './Components/Dashboard/ElderDetails.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
      {/* <ElderDetails/> */}
    </BrowserRouter>
  </StrictMode>,
)
