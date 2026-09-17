import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import Toast from '../components/Toast';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setToastType('error');
      setToastMessage('Registration Failed');
      setToastDesc('Passwords do not match');
      setShowToast(true);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await api.register(username, email, password);
      setToastType('success');
      setToastMessage('Registration Successful');
      setToastDesc('Your account has been created. Redirecting to Login...');
      setShowToast(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed');
      setToastType('error');
      setToastMessage('Registration Failed');
      setToastDesc(err.message || 'Username or email already exists');
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col antialiased bg-black text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <main className="flex-grow flex items-center justify-center p-md md:p-lg relative overflow-hidden z-10">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.8"></path>
              </pattern>
            </defs>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        {/* Registration Card */}
        <div className="glass-panel w-full max-w-[480px] p-lg rounded-2xl flex flex-col gap-lg relative z-10 shadow-[0_32px_64px_rgba(0,0,0,0.8)] border border-white/15">
          {/* Header */}
          <div className="flex flex-col items-center gap-sm border-b border-white/10 pb-md">
            <div className="flex items-center gap-sm">
              <div className="p-2 rounded-xl bg-white/10 border border-white/20">
                <span className="material-symbols-outlined text-[28px] text-white">link</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-white font-bold">LinkEngine</h1>
            </div>
            <p className="font-body-md text-body-md text-zinc-400">Create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            {errorMsg && (
              <div className="p-md rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-body-sm">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-zinc-400" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="User"
                className="glass-input rounded-xl p-sm font-code-sm text-code-sm border border-white/15 focus:border-white"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-zinc-400" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="glass-input rounded-xl p-sm font-code-sm text-code-sm border border-white/15 focus:border-white"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-zinc-400" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input rounded-xl p-sm font-code-sm text-code-sm border border-white/15 focus:border-white"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-zinc-400" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input rounded-xl p-sm font-code-sm text-code-sm border border-white/15 focus:border-white"
                required
              />
            </div>

            <div className="pt-sm flex flex-col gap-sm">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded-xl p-sm font-label-caps text-label-caps w-full py-md flex items-center justify-center gap-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span>{loading ? 'Registering...' : 'Create Account'}</span>
              </button>
              <Link
                to="/login"
                className="btn-secondary rounded-xl p-sm font-label-caps text-label-caps w-full text-center py-md"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>

          {/* Footer Accents */}
          <div className="pt-md border-t border-white/10 flex justify-between items-center opacity-60">
            <span className="font-code-sm text-code-sm text-zinc-400">v.2.4.1</span>
            <span className="font-code-sm text-code-sm text-zinc-400">Secure Connection</span>
          </div>
        </div>
      </main>
      
      <Toast
        show={showToast}
        message={toastMessage}
        description={toastDesc}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
