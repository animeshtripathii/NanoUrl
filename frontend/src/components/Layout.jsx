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
    { name: 'Settings', path: '/settings', icon: 'settings' },
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
    <div className="flex min-h-screen text-body-md font-body-md bg-black text-white">
      {/* SideNav Desktop */}
      <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 w-64 glass-panel border-r border-white/10">
        <div className="p-lg border-b border-white/10">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <BrandLogo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-white tracking-tight">NanoURL</h1>
            </div>
          </div>
          <button
            onClick={handleShortenClick}
            className="mt-lg w-full btn-primary font-body-sm text-body-sm rounded-xl py-md flex items-center justify-center gap-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]"
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
                  className={`flex items-center gap-md px-md py-md rounded-xl font-label-caps text-label-caps transition-all ${
                    isActive(item.path)
                      ? 'text-white bg-white/15 border-r-4 border-white font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
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
        <div className="p-md border-t border-white/10 flex flex-col gap-md">
          {/* User details badge */}
          <div className="flex items-center gap-md p-sm glass-card rounded-xl border border-white/10">
            <span className="material-symbols-outlined text-white">person</span>
            <div className="truncate">
              <p className="font-code-sm text-code-sm text-white font-bold truncate">
                {user?.sub || user?.username || 'user'}
              </p>
              <p className="font-code-sm text-[10px] text-zinc-400 uppercase truncate">
                {user?.roles || 'ROLE_USER'}
              </p>
            </div>
          </div>

          <ul className="flex flex-col space-y-xs">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-md px-md py-sm rounded-xl font-label-caps text-label-caps text-zinc-400 hover:bg-white/10 hover:text-white transition-all text-left"
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
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 glass-panel border-r border-white/10 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-lg border-b border-white/10 flex justify-between items-center bg-black">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <BrandLogo className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-white">NanoURL</h1>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-sm text-zinc-400 hover:text-white"
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
                  className={`flex items-center gap-md px-md py-md rounded-xl font-label-caps text-label-caps transition-all ${
                    isActive(item.path)
                      ? 'text-white bg-white/15 border-r-4 border-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-md border-t border-white/10 flex flex-col gap-sm bg-black">
          <div className="font-code-sm text-code-sm text-zinc-400 truncate px-md">
            Signed in as: <strong className="text-white">{user?.sub || user?.username || 'user'}</strong>
          </div>
          <ul className="flex flex-col space-y-xs">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-md px-md py-sm rounded-xl font-label-caps text-label-caps text-zinc-400 hover:bg-white/10 hover:text-white transition-all text-left"
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
        <header className="md:hidden sticky top-0 z-30 backdrop-blur-md bg-black/80 border-b border-white/10 px-lg py-md flex justify-between items-center">
          <div className="flex items-center gap-sm">
            <BrandLogo className="w-6 h-6 text-white" />
            <span className="font-headline-sm text-headline-sm font-bold text-white">NanoURL</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-sm text-white border border-white/15 rounded-lg bg-white/5"
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
