import React, { useContext } from 'react';
import { AuthContext } from '../App';
import Layout from '../components/Layout';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <header className="mb-xl">
        <h2 className="font-display-lg text-display-lg text-on-surface mb-sm">Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          View your account profile.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: Navigation Tabs */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="flex flex-col gap-sm sticky top-lg">
            <button className="text-left px-md py-sm rounded text-primary font-label-caps text-label-caps bg-surface-container-high border-l-2 border-[#FF6B2C]">
              General
            </button>
          </div>
        </div>

        {/* Right Column: Settings Content */}
        <div className="lg:col-span-2 flex flex-col gap-xl">
          {/* Profile Section */}
          <section className="card-surface rounded-lg p-lg bg-level-1">
            <div className="border-b border-[#292929] pb-sm mb-lg flex justify-between items-end">
              <h3 className="font-headline-md text-headline-md text-on-surface">Profile Information</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-lg mb-lg">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-md justify-center">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Username</label>
                  <p className="font-code-md text-code-md text-on-surface p-sm bg-surface-container-low rounded w-full md:w-2/3">
                    {user?.username || user?.sub || 'user'}
                  </p>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Email Address</label>
                  <p className="font-code-md text-code-md text-on-surface p-sm bg-surface-container-low rounded w-full md:w-2/3">
                    {user?.email || user?.sub || 'user@example.com'}
                  </p>
                </div>
                <div className="flex flex-col gap-xs mt-sm">
                   <p className="font-code-sm text-code-sm text-on-surface-variant">
                     Note: Profile editing is currently not supported in this version.
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="card-surface rounded-lg p-lg bg-level-1">
            <div className="border-b border-[#292929] pb-sm mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Appearance</h3>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <label className="cursor-pointer group">
                <div className="border-2 border-primary bg-[#151515] rounded p-sm h-32 flex flex-col justify-between relative overflow-hidden">
                  <div className="h-4 bg-[#292929] w-1/2 rounded mb-sm"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#292929] w-full rounded"></div>
                    <div className="h-2 bg-[#292929] w-3/4 rounded"></div>
                  </div>
                  <div className="absolute top-sm right-sm bg-primary-container w-4 h-4 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-white">check</span>
                  </div>
                </div>
                <div className="mt-sm text-center font-label-caps text-label-caps text-primary">
                  Dark (System)
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
