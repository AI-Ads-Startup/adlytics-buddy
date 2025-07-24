import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuthContext } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import ProtectedRoute from '@/components/ProtectedRoute'

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, signOut, loading } = useAuthContext();

  // Routes where Navigation should not be shown
  const hideNavigationRoutes = ['/'];
  const shouldShowNavigation = !hideNavigationRoutes.includes(location.pathname);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {shouldShowNavigation && (
        <Navigation
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
      <Sonner />
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  )
}

export default App