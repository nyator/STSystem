import { useMemo, useState, useEffect } from "react"
import { authApi } from "../utils/api"
import { AuthContext } from "./authContextObject"
import toast from "react-hot-toast"

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Initialize auth state from localStorage (check for token on mount)
    useEffect(() => {
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser))
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Failed to parse stored user:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
    }, [])

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        
        login: async (email, password) => {
            try {
                setLoading(true)
                const response = await authApi.login(email, password)
                
                if (response.data.success) {
                    const { token, user: userData } = response.data
                    
                    // Store token and user data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(userData))
                    
                    setUser(userData)
                    setIsAuthenticated(true)
                    toast.success('Login successful')
                    
                    return { success: true, user: userData }
                } else {
                    toast.error(response.data.message || 'Login failed')
                    return { success: false, message: response.data.message }
                }
            } catch (error) {
                const message = error.response?.data?.message || error.message || 'Login failed'
                toast.error(message)
                return { success: false, message }
            } finally {
                setLoading(false)
            }
        },

        register: async (registerData) => {
            try {
                setLoading(true)
                const response = await authApi.register(registerData)
                
                if (response.data.success) {
                    toast.success('Registration successful. Please login.')
                    return { success: true }
                } else {
                    toast.error(response.data.message || 'Registration failed')
                    return { success: false, message: response.data.message }
                }
            } catch (error) {
                const message = error.response?.data?.message || error.message || 'Registration failed'
                toast.error(message)
                return { success: false, message }
            } finally {
                setLoading(false)
            }
        },

        logout: async () => {
            try {
                setLoading(true)
                await authApi.logout()
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                // Clear auth state regardless of API response
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
                toast.success('Logout successful')
            }
        },
    }), [user, isAuthenticated, loading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
