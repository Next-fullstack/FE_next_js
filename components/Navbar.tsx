"use client"


import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/AuthContext"

export function Navbar() {
    // Dummy state to simulate login status
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { isAuthenticated, logout } = useAuth()


    return (
        <nav className="flex items-center justify-between p-4 sm:px-10 bg-background border-b">
            <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold">
                    Logo
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <Button variant="ghost" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button variant="ghost" >
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

