import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { WasdControlled } from './app'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WasdControlled speed={2}>
      
    </WasdControlled>
  </StrictMode>
)