import Dashboard from '../pages/Dashboard'
import Ticket from '../pages/Ticket'
import Team from '../pages/Team'
import Settings from '../pages/Settings'

function MainContent({ selectedMenu }) {
    return (
        <div>
            {selectedMenu === 'Dashboard' && <Dashboard />}
            {selectedMenu === 'Tickets' && <Ticket />}
            {selectedMenu === 'Team' && <Team />}
            {selectedMenu === 'Settings' && <Settings />}

        </div>
    )
}

export default MainContent