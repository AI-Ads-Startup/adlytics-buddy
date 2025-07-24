'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Navigation from '@/components/Navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { isAuthenticated, signOut } = useAuth()

    // Routes where Navigation should not be shown
    const hideNavigationRoutes = ['/', '/login', '/signup']
    const shouldShowNavigation = !hideNavigationRoutes.includes(pathname)

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <>
            {shouldShowNavigation && (
                <Navigation
                    isAuthenticated={isAuthenticated}
                    onSignOut={handleSignOut}
                />
            )}
            {children}
        </>
    )
}
