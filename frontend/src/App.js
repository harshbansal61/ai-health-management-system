import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import HomePage           from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import DashboardPage      from './pages/DashboardPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import { ResultPage, HistoryPage, ProfilePage } from './pages/UserPages';
import { AdminDashboard, AdminUsersPage, AdminPredictionsPage,
         AdminSymptomsPage, AdminDiseasesPage } from './pages/AdminPages';
import { AboutPage, ContactPage, DisclaimerPage } from './pages/InfoPages';

// ── Guards ────────────────────────────────────────────────────────────────────
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user)              return <Navigate to="/login"  replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// ── Layout ────────────────────────────────────────────────────────────────────
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function AuthLayout({ children }) {
  return <>{children}</>;   // Auth pages have their own full-screen layout
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
            success: { iconTheme: { primary: '#1e40af', secondary: '#fff' } },
          }}
        />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about"      element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact"    element={<Layout><ContactPage /></Layout>} />
          <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />

          {/* Guest only */}
          <Route path="/login"    element={<GuestOnly><AuthLayout><LoginPage /></AuthLayout></GuestOnly>} />
          <Route path="/register" element={<GuestOnly><AuthLayout><RegisterPage /></AuthLayout></GuestOnly>} />

          {/* Protected user routes */}
          <Route path="/dashboard" element={<RequireAuth><Layout><DashboardPage /></Layout></RequireAuth>} />
          <Route path="/checker"   element={<RequireAuth><Layout><SymptomCheckerPage /></Layout></RequireAuth>} />
          <Route path="/result"    element={<RequireAuth><Layout><ResultPage /></Layout></RequireAuth>} />
          <Route path="/history"   element={<RequireAuth><Layout><HistoryPage /></Layout></RequireAuth>} />
          <Route path="/profile"   element={<RequireAuth><Layout><ProfilePage /></Layout></RequireAuth>} />

          {/* Admin routes */}
          <Route path="/admin"              element={<RequireAdmin><Layout><AdminDashboard /></Layout></RequireAdmin>} />
          <Route path="/admin/users"        element={<RequireAdmin><Layout><AdminUsersPage /></Layout></RequireAdmin>} />
          <Route path="/admin/predictions"  element={<RequireAdmin><Layout><AdminPredictionsPage /></Layout></RequireAdmin>} />
          <Route path="/admin/symptoms"     element={<RequireAdmin><Layout><AdminSymptomsPage /></Layout></RequireAdmin>} />
          <Route path="/admin/diseases"     element={<RequireAdmin><Layout><AdminDiseasesPage /></Layout></RequireAdmin>} />

          {/* Catch-all */}
          <Route path="*" element={<Layout><div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
            <h1 className="text-6xl font-display font-bold text-primary">404</h1>
            <p className="text-slate-500">Page not found</p>
            <a href="/" className="btn-primary">Go Home</a>
          </div></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
