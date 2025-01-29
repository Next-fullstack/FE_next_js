"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    token: string | null
    logout: () => void
    checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState<string | null>(null)

    const checkAuth = async () => {
        // Get token from cookies
        const cookies = document.cookie.split(';')
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='))
        const currentToken = tokenCookie ? tokenCookie.split('=')[1] : null

        if (currentToken) {
            setToken(currentToken)
            setIsAuthenticated(true)
        } else {
            setToken(null)
            setIsAuthenticated(false)
        }
    }

    const logout = () => {
        // Remove token cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        setToken(null)
        setIsAuthenticated(false)
        window.location.href = '/login'
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}