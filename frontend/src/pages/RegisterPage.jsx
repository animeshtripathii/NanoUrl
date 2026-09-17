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
    <div className="min-h-screen flex flex-col antialiased bg-[#0B0B0B] text-on-surface">
      <main className="flex-grow flex items-center justify-center p-md md:p-lg relative overflow-hidden">
        {/* Background Tech Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#292929" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        {/* Registration Card */}
        <div className="card-surface w-full max-w-[480px] p-lg rounded flex flex-col gap-lg relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex flex-col items-center gap-sm border-b border-[#292929] pb-md">
            <div className="flex items-center gap-sm text-primary-container">
              <span className="material-symbols-outlined text-[32px] text-accent-primary">link</span>
              <h1 className="font-headline-md text-headline-md text-on-background">LinkEngine</h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            {errorMsg && (
              <div className="p-md rounded bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 text-[#ffb4ab] text-body-sm">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Harmeet"
                className="input-tech rounded p-sm font-code-sm text-code-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harmeet@email.com"
                className="input-tech rounded p-sm font-code-sm text-code-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-tech rounded p-sm font-code-sm text-code-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input-tech rounded p-sm font-code-sm text-code-sm"
                required
              />
            </div>

            <div className="pt-sm flex flex-col gap-sm">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded p-sm font-label-caps text-label-caps w-full hover:opacity-90 transition-opacity py-md flex items-center justify-center gap-sm"
              >
                <span>{loading ? 'Registering...' : 'Create Account'}</span>
              </button>
              <Link
                to="/login"
                className="btn-secondary rounded p-sm font-label-caps text-label-caps w-full text-center hover:bg-[#1E1E1E] transition-colors py-md"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>

          {/* Footer Accents */}
          <div className="pt-md border-t border-[#292929] flex justify-between items-center opacity-50">
            <span className="font-code-sm text-code-sm text-on-surface-variant">v.2.4.1</span>
            <span className="font-code-sm text-code-sm text-on-surface-variant">Secure Connection</span>
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
