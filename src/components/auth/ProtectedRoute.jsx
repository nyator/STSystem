import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../Hooks/useAuth"

function ProtectedRoute({ children, roles }) {
    const { user, isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (roles?.length && !roles.includes(user.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
