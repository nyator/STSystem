import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast'
import SideBar from './Layouts/SideBar'
import { ThemeProvider } from './context/themeContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <SideBar />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
      <Toaster position='top-center' />
    </QueryClientProvider>
  </StrictMode>,
)
