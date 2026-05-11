import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Ticket from '../pages/Ticket'
import Team from '../pages/Team'
import Settings from '../pages/Settings'
import Login from '../pages/Login'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { ROLES } from '../utils/AuthUtil'

function MainContent() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute roles={[ROLES.ADMIN]}><Team /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default MainContent
