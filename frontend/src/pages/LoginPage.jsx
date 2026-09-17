import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { api } from '../services/api';
import Toast from '../components/Toast';

// Parse a friendly message from a raw server error string/JSON
function parseFriendlyError(raw) {
  if (!raw) return 'Invalid username or password.';
  try {
    const parsed = JSON.parse(raw);
    if (parsed.message) return parsed.message;
    if (parsed.error) return parsed.error;
  } catch (_) {}
  if (raw.toLowerCase().includes('bad credentials') || raw.toLowerCase().includes('unauthorized')) {
    return 'Invalid username or password.';
  }
  if (raw.toLowerCase().includes('forbidden')) {
    return 'Access denied. Please check your credentials.';
  }
  if (raw.toLowerCase().includes('not found')) {
    return 'Account not found. Please register first.';
  }
  return 'Something went wrong. Please try again.';
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.login(email, password);
      setToastType('success');
      setToastMessage('Welcome back!');
      setToastDesc('Logged in successfully. Redirecting...');
      setShowToast(true);

      setTimeout(() => {
        login(response.token);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const friendly = parseFriendlyError(err.message);
      setErrorMsg(friendly);
      setToastType('error');
      setToastMessage('Login Failed');
      setToastDesc(friendly);
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] antialiased selection:bg-[#FF6B2C] selection:text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FF6B2C]/5 blur-[130px] pointer-events-none" />

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="login-grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect fill="url(#login-grid)" height="100%" width="100%" />
        </svg>
      </div>

      <main className="w-full max-w-[420px] px-4 md:px-0 relative z-10">
        <div className="bg-[#111111] border border-[#222222] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.75)] overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-10 pb-7 border-b border-[#1c1c1c] flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-[#282828] flex items-center justify-center shadow-[0_0_28px_rgba(255,107,44,0.18)]">
              <span className="material-symbols-outlined text-[26px] text-[#FF6B2C]">link</span>
            </div>
            <div className="text-center">
              <h1 className="text-[21px] font-semibold text-[#f0e8e4] tracking-tight">Sign in to LinkEngine</h1>
              <p className="text-[13px] text-[#5a5a5a] mt-1">Manage and track your links in one place</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {errorMsg && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#ff3333]/8 border border-[#ff3333]/20 text-[#ff8080] text-[13px]">
                <span className="material-symbols-outlined text-[17px] flex-shrink-0 mt-0.5">error_outline</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#666] tracking-widest uppercase" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px] text-[#444]">mail</span>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="harmeet@linkengine.io"
                  className="w-full bg-[#0d0d0d] border border-[#232323] rounded-xl pl-10 pr-4 py-3 text-[13px] text-[#e0d8d4] placeholder-[#383838] transition-all duration-200 focus:outline-none focus:border-[#FF6B2C] focus:shadow-[0_0_0_3px_rgba(255,107,44,0.10)]"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-[#666] tracking-widest uppercase" htmlFor="password">
                  Password
                </label>
                <a className="text-[12px] text-[#FF6B2C] hover:text-[#ff8a50] transition-colors" href="#forgot">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px] text-[#444]">lock</span>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0d0d0d] border border-[#232323] rounded-xl pl-10 pr-12 py-3 text-[13px] text-[#e0d8d4] placeholder-[#383838] transition-all duration-200 focus:outline-none focus:border-[#FF6B2C] focus:shadow-[0_0_0_3px_rgba(255,107,44,0.10)]"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#444] hover:text-[#777] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-1 space-y-3">
              <button
                type="submit"
                disabled={loading}
                id="login-submit-btn"
                className="w-full bg-[#FF6B2C] hover:bg-[#e55a20] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[13px] py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,107,44,0.28)] hover:shadow-[0_4px_28px_rgba(255,107,44,0.42)]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>

              <Link
                to="/register"
                className="w-full block text-center bg-transparent border border-[#222] hover:border-[#333] text-[#666] hover:text-[#999] font-medium text-[13px] py-3.5 rounded-xl transition-all duration-200"
              >
                Don't have an account? <span className="text-[#FF6B2C]">Create one</span>
              </Link>
            </div>
          </form>

          {/* Bottom strip */}
          <div className="px-8 py-3.5 bg-[#0d0d0d] border-t border-[#191919] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] animate-pulse" />
            <span className="text-[11px] text-[#333] font-mono tracking-widest">LINKENGINE · SECURE</span>
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
