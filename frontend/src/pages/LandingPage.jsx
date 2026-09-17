import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Navbar from '../components/Navbar';
import BrandLogo from '../components/BrandLogo';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/dashboard' : '/register');
  };

  const handleManageLinks = () => {
    navigate(isAuthenticated ? '/my-links' : '/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Promotional Top Info Bar */}
      <div className="w-full backdrop-blur-md bg-zinc-950/80 border-b border-white/10 py-xs px-md flex items-center justify-center text-center">
        <p className="font-code-sm text-[11px] text-zinc-400">
          <span className="text-white font-bold tracking-wider">SYSTEM ONLINE</span> (v2.4.1) — High performance URL routing & click analytics engine active.
        </p>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col relative w-full max-w-container-max mx-auto px-margin-mobile md:px-lg">
        
        {/* Hero Section */}
        <section className="relative pt-2xl pb-2xl flex flex-col items-center justify-center text-center mt-xl border-b border-white/10">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0"></div>
          
          <div className="z-10 flex flex-col items-center max-w-3xl w-full">
            <div className="inline-flex items-center gap-2 px-md py-xs rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="font-code-sm text-code-sm text-zinc-300">NanoURL Routing Active</span>
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-md tracking-tight">
              NANOURL — <br className="md:hidden" />Shorten. Share. Track.
            </h1>

            <p className="font-body-lg text-body-lg text-zinc-400 mb-xl max-w-2xl font-normal leading-relaxed">
              Generate precise technical aliases for your long web links, track client-side request data telemetry, and redirect users with sub-millisecond response rates.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-md mt-md">
              <button
                onClick={handleGetStarted}
                className="btn-primary px-xl py-md rounded-xl font-label-caps tracking-widest text-label-caps flex items-center gap-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="material-symbols-outlined text-[18px]">add_link</span>
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
              </button>
              <button
                onClick={handleManageLinks}
                className="btn-secondary px-xl py-md rounded-xl font-label-caps tracking-widest text-label-caps flex items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[18px]">link</span>
                {isAuthenticated ? 'My Links' : 'Sign In'}
              </button>
            </div>

            {/* Brand Flow Graphic */}
            <div className="relative w-full max-w-lg h-56 glass-panel rounded-2xl overflow-hidden flex items-center justify-center p-md mt-2xl border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
              <div className="flex items-center justify-between w-full px-lg relative z-10">
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-zinc-300 hover:border-white hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                  <span className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider">Original Link</span>
                </div>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-white/10 via-white to-white/10 mx-md relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                </div>
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-white shadow-lg shadow-white/10 backdrop-blur-md">
                    <BrandLogo className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-code-sm text-[10px] text-white font-bold uppercase tracking-widest">NanoURL</span>
                </div>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-white/10 via-white to-white/10 mx-md relative">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                </div>
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-zinc-300 hover:border-white hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <span className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider">Track & Redirect</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Product Explanation Section */}
        <section id="about" className="py-2xl border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="space-y-md text-left">
              <h2 className="font-headline-md text-headline-md text-white font-bold">How NanoURL Works</h2>
              <p className="font-body-md text-body-md text-zinc-400 leading-relaxed">
                NanoURL is built for modern developer workflows. When a client accesses a shortened URL, our gateway resolves the hash using database indexes in under 2ms, logs telemetry click metadata, and sends an HTTP 302 redirect.
              </p>
              <ul className="space-y-sm font-code-sm text-code-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  High performance Java + Spring Boot core logic.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  JWT authentication keeps URL lists private and protected.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Detailed click logs generated for every redirect request.
                </li>
              </ul>
            </div>
            <div className="glass-panel p-lg rounded-2xl border border-white/10 space-y-md text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-xs">
                <span className="font-label-caps text-label-caps text-white font-bold">API Example Request</span>
                <span className="font-code-sm text-[10px] text-zinc-400">cURL</span>
              </div>
              <pre className="font-code-sm text-code-sm text-zinc-300 bg-black/70 p-md rounded-xl overflow-x-auto border border-white/10">
{`curl -X POST https://your-backend.onrender.com/api/urls/shorten \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{"originalUrl": "https://example.com"}'`}
              </pre>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-2xl w-full">
          <div className="flex flex-col items-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-white mb-sm font-bold">
              Features Built for Scale
            </h2>
            <p className="font-body-md text-body-md text-zinc-400 max-w-2xl text-center">
              Built for speed, simplicity, and technical integrity. Track telemetry with minimal overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-lg text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-white/10">
                  <h3 className="font-headline-sm text-headline-sm text-white font-semibold">Edge Resolution</h3>
                  <span className="material-symbols-outlined text-white">bolt</span>
                </div>
                <p className="font-body-sm text-body-sm text-zinc-400">
                  Links are resolved dynamically on-demand, fetching original targets in sub-millisecond rates.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-white font-semibold mt-lg">
                Status: Latency Optimal
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-lg text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-white/10">
                  <h3 className="font-headline-sm text-headline-sm text-white font-semibold">Click Analytics</h3>
                  <span className="material-symbols-outlined text-white">monitoring</span>
                </div>
                <p className="font-body-sm text-body-sm text-zinc-400">
                  Each redirect logs access time stamps and logs click counts to help you understand traffic growth.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-white font-semibold mt-lg">
                Telemetries: Logged
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-lg text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-white/10">
                  <h3 className="font-headline-sm text-headline-sm text-white font-semibold">Secured Storage</h3>
                  <span className="material-symbols-outlined text-white">security</span>
                </div>
                <p className="font-body-sm text-body-sm text-zinc-400">
                  JWT authentication with Spring Security isolates URL mappings, keeping your dashboard logs secure.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-white font-semibold mt-lg">
                Access Control: Active
              </div>
            </div>
          </div>
        </section>

        {/* Trust/Value Section */}
        <section className="py-2xl border border-white/10 glass-panel rounded-2xl p-lg text-center my-xl">
          <h3 className="font-headline-md text-headline-md text-white mb-lg font-bold">High-Performance Link Utilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            <div className="p-md glass-card rounded-xl">
              <p className="font-display-lg-mobile text-white font-bold">99.9%</p>
              <p className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Uptime SLA</p>
            </div>
            <div className="p-md glass-card rounded-xl">
              <p className="font-display-lg-mobile text-white font-bold">&lt; 3ms</p>
              <p className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Redirect Time</p>
            </div>
            <div className="p-md glass-card rounded-xl">
              <p className="font-display-lg-mobile text-white font-bold">100%</p>
              <p className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Open Source</p>
            </div>
            <div className="p-md glass-card rounded-xl">
              <p className="font-display-lg-mobile text-white font-bold">MySQL</p>
              <p className="font-code-sm text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Indexed Storage</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-zinc-950/80 border-t border-white/10 w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <div className="flex items-center gap-2 mb-md md:mb-0">
          <span className="font-headline-sm text-headline-sm text-white font-bold">NanoURL</span>
          <span className="font-body-sm text-body-sm text-zinc-400 ml-4">
            © 2026 NanoURL Inc. All rights reserved.
          </span>
        </div>
        <div className="flex gap-md font-body-sm text-body-sm text-zinc-400">
          <a className="hover:text-white transition-colors" href="#privacy">Privacy Policy</a>
          <a className="hover:text-white transition-colors" href="#terms">Terms of Service</a>
          <a className="hover:text-white transition-colors" href="#api">API Docs</a>
          <a className="hover:text-white transition-colors" href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
