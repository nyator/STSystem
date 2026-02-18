import React from 'react'
import Dashboard from '../pages/Dashboard'
import Ticket from '../pages/Ticket'

function MainContent({ selectedMenu }) {
    return (
        <div>
            {selectedMenu === 'Dashboard' && <Dashboard />}
            {selectedMenu === 'Tickets' && <Ticket />}
        </div>
    )
}

export default MainContent