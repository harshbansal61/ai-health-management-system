import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiActivity, FiHome, FiUser, FiLogOut, FiMenu, FiX,
  FiClock, FiSettings, FiShield
} from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = path => location.pathname === path;

  const navLink = (to, label, Icon) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
        ${isActive(to)
          ? 'bg-primary text-white shadow-md'
          : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}
    >
      <Icon size={16} /> {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FiActivity className="text-white" size={18} />
            </div>
            MediCheck<span className="text-accent">AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLink('/', 'Home', FiHome)}
            {user && navLink('/dashboard', 'Dashboard', FiActivity)}
            {user && navLink('/checker',   'Symptom Checker', FiActivity)}
            {user && navLink('/history',   'History', FiClock)}
            {navLink('/about',   'About',   FiShield)}
            {navLink('/contact', 'Contact', FiUser)}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary px-3 py-2 rounded-lg hover:bg-slate-50">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  {user.name}
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100">
                    <FiSettings size={13} /> Admin
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50">
                  <FiLogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn-outline text-sm py-2">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 animate-slide-up">
          {navLink('/', 'Home', FiHome)}
          {user && navLink('/dashboard', 'Dashboard',       FiActivity)}
          {user && navLink('/checker',   'Symptom Checker', FiActivity)}
          {user && navLink('/history',   'History',         FiClock)}
          {navLink('/about',   'About',   FiShield)}
          {navLink('/contact', 'Contact', FiUser)}
          {user?.role === 'admin' && navLink('/admin', 'Admin Panel', FiSettings)}
          {user ? (
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium">
              <FiLogOut /> Logout
            </button>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link to="/login"    onClick={() => setMobileOpen(false)} className="btn-outline flex-1 text-center text-sm">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center text-sm">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
