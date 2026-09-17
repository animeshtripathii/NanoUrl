import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from './BrandLogo';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'My Links', path: '/my-links', icon: 'link' },
    { name: 'Analytics', path: '/analytics', icon: 'monitoring' },
    { name: 'Settings', path: '/settings', icon: 'settings' }, // Gear icon specifically for settings
  ];

  const handleShortenClick = () => {
    navigate('/dashboard');
    setTimeout(() => {
      const input = document.getElementById('url-input');
      if (input) input.focus();
    }, 100);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen text-body-md font-body-md bg-[#0B0B0B] text-on-surface">
      {/* SideNav Desktop */}
      <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 w-64 bg-surface-container border-r border-border-subtle">
        <div className="p-lg border-b border-border-subtle">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-[#FF6B2C]/10 border border-border-subtle flex items-center justify-center overflow-hidden">
              <BrandLogo className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-white tracking-tight">LinkEngine</h1>
            </div>
          </div>
          <button
            onClick={handleShortenClick}
            className="mt-lg w-full btn-primary font-body-sm text-body-sm rounded-DEFAULT py-md flex items-center justify-center gap-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Shorten Link
          </button>
        </div>

        <div className="flex-1 py-md overflow-y-auto">
          <ul className="flex flex-col space-y-xs px-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-md px-md py-md rounded-DEFAULT font-label-caps text-label-caps transition-all ${
                    isActive(item.path)
                      ? 'text-primary bg-[#FF6B2C]/10 border-r-4 border-[#FF6B2C] scale-95'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Info & Logout */}
        <div className="p-md border-t border-border-subtle flex flex-col gap-md">
          {/* User details badge */}
          <div className="flex items-center gap-md p-sm bg-[#1E1E1E] rounded-DEFAULT border border-border-subtle">
            <span className="material-symbols-outlined text-accent-primary">person</span>
            <div className="truncate">
              <p className="font-code-sm text-code-sm text-white font-bold truncate">
                {user?.sub || user?.username || 'user'}
              </p>
              <p className="font-code-sm text-[10px] text-on-surface-variant uppercase truncate">
                {user?.roles || 'ROLE_USER'}
              </p>
            </div>
          </div>

          <ul className="flex flex-col space-y-xs">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-md px-md py-sm rounded-DEFAULT font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile SideNav Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-surface-container border-r border-border-subtle z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-lg border-b border-border-subtle flex justify-between items-center bg-[#0B0B0B]">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded bg-[#FF6B2C]/10 border border-border-subtle flex items-center justify-center">
              <BrandLogo className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-white">LinkEngine</h1>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-sm text-on-surface-variant hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 py-md overflow-y-auto">
          <ul className="flex flex-col space-y-xs px-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-md px-md py-md rounded-DEFAULT font-label-caps text-label-caps transition-all ${
                    isActive(item.path)
                      ? 'text-primary bg-[#FF6B2C]/10 border-r-4 border-[#FF6B2C]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-md border-t border-border-subtle flex flex-col gap-sm bg-[#0B0B0B]">
          {/* User identifier */}
          <div className="font-code-sm text-code-sm text-on-surface-variant truncate px-md">
            Signed in as: <strong className="text-white">{user?.sub || user?.username || 'user'}</strong>
          </div>
          <ul className="flex flex-col space-y-xs">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-md px-md py-sm rounded-DEFAULT font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-border-subtle px-lg py-md flex justify-between items-center">
          <div className="flex items-center gap-sm">
            <BrandLogo className="w-6 h-6" />
            <span className="font-headline-sm text-headline-sm font-bold text-white">LinkEngine</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-sm text-on-surface border border-border-subtle rounded bg-[#151515]"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <main className="flex-grow p-md md:p-2xl max-w-container-max w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
