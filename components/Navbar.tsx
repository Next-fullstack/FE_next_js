"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    // Dummy state to simulate login status
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = () => {
        // Implement logout logic here
        setIsLoggedIn(false)
    }

    const handleLogin = () => {
        // Implement login logic here
        setIsLoggedIn(true)
    }

    return (
        <nav className="flex items-center justify-between p-4 sm:px-10 bg-background border-b">
            <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold">
                    Logo
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button variant="ghost" onClick={handleLogin}>
                            {/* <LogIn className="mr-2 h-4 w-4" /> */}
                            <Link href={'/login'}>Masuk</Link>
                        </Button>
                        <Button>
                            {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                            <Link href={'/register'}>Daftar</Link>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    )
}

