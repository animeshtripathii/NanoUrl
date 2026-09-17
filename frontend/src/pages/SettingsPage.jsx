import React, { useContext } from 'react';
import { AuthContext } from '../App';
import Layout from '../components/Layout';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <header className="mb-xl">
        <h2 className="font-display-lg text-display-lg text-white font-bold mb-sm">Settings</h2>
        <p className="font-body-lg text-body-lg text-zinc-400">
          View your account profile.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: Navigation Tabs */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="flex flex-col gap-sm sticky top-lg">
            <button className="text-left px-md py-sm rounded-xl text-white font-label-caps text-label-caps bg-white/10 border-l-4 border-white font-bold">
              General
            </button>
          </div>
        </div>

        {/* Right Column: Settings Content */}
        <div className="lg:col-span-2 flex flex-col gap-xl">
          {/* Profile Section */}
          <section className="glass-panel rounded-2xl p-lg border border-white/10">
            <div className="border-b border-white/10 pb-sm mb-lg flex justify-between items-end">
              <h3 className="font-headline-md text-headline-md text-white font-bold">Profile Information</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-lg mb-lg">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-white">person</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-md justify-center">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-zinc-400">Username</label>
                  <p className="font-code-md text-code-md text-white p-sm glass-input rounded-xl w-full md:w-2/3 border border-white/15">
                    {user?.username || user?.sub || 'user'}
                  </p>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-zinc-400">Email Address</label>
                  <p className="font-code-md text-code-md text-white p-sm glass-input rounded-xl w-full md:w-2/3 border border-white/15">
                    {user?.email || user?.sub || 'user@example.com'}
                  </p>
                </div>
                <div className="flex flex-col gap-xs mt-sm">
                   <p className="font-code-sm text-code-sm text-zinc-400">
                     Note: Profile editing is currently not supported in this version.
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="glass-panel rounded-2xl p-lg border border-white/10">
            <div className="border-b border-white/10 pb-sm mb-lg">
              <h3 className="font-headline-md text-headline-md text-white font-bold">Appearance</h3>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <label className="cursor-pointer group">
                <div className="border-2 border-white bg-black/80 rounded-xl p-sm h-32 flex flex-col justify-between relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <div className="h-4 bg-white/20 w-1/2 rounded mb-sm"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/20 w-full rounded"></div>
                    <div className="h-2 bg-white/20 w-3/4 rounded"></div>
                  </div>
                  <div className="absolute top-sm right-sm bg-white w-5 h-5 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>
                  </div>
                </div>
                <div className="mt-sm text-center font-label-caps text-label-caps text-white font-bold">
                  High-Contrast Monochromatic (Active)
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
