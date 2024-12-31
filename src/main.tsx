import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Users from './users/Users'
import { ThemeProvider } from './context/theme-context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <Users />
    </ThemeProvider>
  </StrictMode>
)
