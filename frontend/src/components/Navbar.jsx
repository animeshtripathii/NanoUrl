import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base border-b border-border-subtle w-full px-lg py-md sticky top-0 z-50 backdrop-blur-md bg-[#0B0B0B]/90">
      <div className="max-w-container-max mx-auto flex justify-between items-center w-full">
        {/* Brand Logo and Name */}
        <div className="flex items-center gap-md">
          <Link to="/" className="flex items-center gap-sm">
            <BrandLogo className="w-8 h-8" />
            <span className="font-headline-md text-headline-md font-bold text-white tracking-tight">
              LinkEngine
            </span>
          </Link>
        </div>

        {/* Dynamic Navigation Links based on Auth Status */}
        <div className="hidden md:flex items-center gap-lg">
          <Link
            to="/"
            className={`font-label-caps text-label-caps transition-colors ${
              isLinkActive('/') ? 'text-[#FF6B2C]' : 'text-on-surface-variant hover:text-[#FF6B2C]'
            }`}
          >
            Home
          </Link>
          
          {!isAuthenticated ? (
            <a
              href="#about"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-[#FF6B2C] transition-colors"
            >
              About
            </a>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`font-label-caps text-label-caps transition-colors ${
                  isLinkActive('/dashboard') ? 'text-[#FF6B2C]' : 'text-on-surface-variant hover:text-[#FF6B2C]'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-links"
                className={`font-label-caps text-label-caps transition-colors ${
                  isLinkActive('/my-links') ? 'text-[#FF6B2C]' : 'text-on-surface-variant hover:text-[#FF6B2C]'
                }`}
              >
                My Links
              </Link>
              <Link
                to="/analytics"
                className={`font-label-caps text-label-caps transition-colors ${
                  isLinkActive('/analytics') ? 'text-[#FF6B2C]' : 'text-on-surface-variant hover:text-[#FF6B2C]'
                }`}
              >
                Analytics
              </Link>
              <Link
                to="/settings"
                className={`font-label-caps text-label-caps transition-colors ${
                  isLinkActive('/settings') ? 'text-[#FF6B2C]' : 'text-on-surface-variant hover:text-[#FF6B2C]'
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
              <div className="flex items-center gap-xs px-sm py-xs bg-surface-level-2 border border-border-subtle rounded font-code-sm text-code-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">person</span>
                <span>{user?.sub || user?.username || 'user'}</span>
              </div>
              <button
                onClick={logout}
                className="btn-secondary px-md py-sm rounded text-body-sm font-label-caps transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary px-md py-sm rounded text-body-sm font-label-caps transition-colors hidden md:block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-md py-sm rounded text-body-sm font-label-caps transition-colors"
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
