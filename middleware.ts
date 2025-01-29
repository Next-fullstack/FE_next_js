import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    
    // Redirect to login if accessing root without token
    if (!token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (!token && request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
        return NextResponse.next()
    }

    // Redirect to home if accessing auth routes with token
    if (token && request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/register']
}