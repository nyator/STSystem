import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Ticket from '../pages/Ticket'
import Team from '../pages/Team'
import Settings from '../pages/Settings'

function MainContent() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default MainContent