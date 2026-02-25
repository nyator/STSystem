import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import SideBar from './Layouts/SideBar'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <SideBar />
      <Toaster position='top-center' />
    </QueryClientProvider>
  // </StrictMode>,
)
