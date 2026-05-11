import { useMemo, useState } from "react"
import { getSession, loginWithCredentials, logoutSession, ensureDefaultAuthData } from "../utils/AuthUtil"
import { AuthContext } from "./authContextObject"

export function AuthProvider({ children }) {
    ensureDefaultAuthData()
    const [user, setUser] = useState(() => getSession())

    const value = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        login: (email, password) => {
            const session = loginWithCredentials(email, password)
            setUser(session)
            return session
        },
        logout: () => {
            logoutSession()
            setUser(null)
        },
    }), [user])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
