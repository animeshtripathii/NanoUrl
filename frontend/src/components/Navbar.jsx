import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className="glass-navbar w-full px-lg py-md sticky top-0 z-50">
      <div className="max-w-container-max mx-auto flex justify-between items-center w-full">
        {/* Brand Logo and Name */}
        <div className="flex items-center gap-md">
          <Link to="/" className="flex items-center gap-sm group">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300">
              <BrandLogo className="w-6 h-6" />
            </div>
            <span className="font-headline-md text-headline-md font-bold text-white tracking-tight">
              NanoURL
            </span>
          </Link>
        </div>

        {/* Dynamic Navigation Links based on Auth Status */}
        <div className="hidden md:flex items-center gap-lg">
          <Link
            to="/"
            className={`font-label-caps text-label-caps transition-all ${
              isLinkActive('/') 
                ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          
          {!isAuthenticated ? (
            <a
              href="#about"
              className="font-label-caps text-label-caps text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`font-label-caps text-label-caps transition-all ${
                  isLinkActive('/dashboard') 
                    ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-links"
                className={`font-label-caps text-label-caps transition-all ${
                  isLinkActive('/my-links') 
                    ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                My Links
              </Link>
              <Link
                to="/analytics"
                className={`font-label-caps text-label-caps transition-all ${
                  isLinkActive('/analytics') 
                    ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Analytics
              </Link>
              <Link
                to="/settings"
                className={`font-label-caps text-label-caps transition-all ${
                  isLinkActive('/settings') 
                    ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Settings
              </Link>
            </>
          )}
        </div>

        {/* User CTA Action Buttons */}
        <div className="flex items-center gap-md">
          {isAuthenticated ? (
            <div className="flex items-center gap-md">
              {/* User Profile display */}
              <div className="flex items-center gap-xs px-md py-xs bg-white/5 border border-white/10 rounded-full font-code-sm text-code-sm text-zinc-300 backdrop-blur-md">
                <span className="material-symbols-outlined text-sm text-white">person</span>
                <span>{user?.sub || user?.username || 'user'}</span>
              </div>
              <button
                onClick={logout}
                className="btn-secondary px-md py-sm rounded-lg text-body-sm font-label-caps"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary px-md py-sm rounded-lg text-body-sm font-label-caps hidden md:block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-md py-sm rounded-lg text-body-sm font-label-caps shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
