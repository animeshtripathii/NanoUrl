import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { api, BASE_URL } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shortening, setShortening] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');
  const [copiedLink, setCopiedLink] = useState('');

  const [lastShortened, setLastShortened] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await api.getUserUrls();
      // Sort by createdDate desc or id desc to get recent links first
      const sorted = [...data].sort((a, b) => {
        return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
      });
      setLinks(sorted);
    } catch (err) {
      console.error('Failed to load links', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    setShortening(true);
    setErrorMsg('');
    setLastShortened(null);

    try {
      const newLink = await api.shortenUrl(longUrl);
      setLastShortened(newLink);
      setToastType('success');
      setToastMessage('URL Shortened Successfully');
      setToastDesc(`Created: ${newLink.shortURl}`);
      setShowToast(true);
      setLongUrl('');
      // Reload links
      fetchLinks();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to shorten URL');
      setToastType('error');
      setToastMessage('Shortening Failed');
      setToastDesc(err.message || 'Error occurred while shortening URL');
      setShowToast(true);
    } finally {
      setShortening(false);
    }
  };

  const handleCopyLink = (shortCode) => {
    const fullUrl = `${BASE_URL}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(shortCode);
    setToastType('success');
    setToastMessage('Link Copied');
    setToastDesc('Short URL copied to clipboard');
    setShowToast(true);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  // Metrics calculations
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0.0';

  const recentLinks = links.slice(0, 3);

  return (
    <Layout>
      <header className="mb-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
        <div>
          <h2 className="font-headline-md text-headline-md md:font-display-lg md:text-display-lg text-on-background">
            Welcome back, {user?.username || user?.sub || 'User'}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">
            Here's a quick overview of your links today.
          </p>
        </div>
      </header>

      {/* Hero Action: Create Short Link */}
      <section className="mb-2xl bg-level-1 border rounded-lg p-lg md:p-2xl shadow-sm">
        <div className="border-b border-[#292929] pb-md mb-lg">
          <h3 className="font-headline-sm text-headline-sm text-primary">CREATE SHORT LINK</h3>
        </div>
        <form onSubmit={handleShortenSubmit} className="flex flex-col md:flex-row gap-lg">
          <div className="flex-1">
            <label className="sr-only" htmlFor="url-input">
              Enter Long URL
            </label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-md text-on-surface-variant">
                <span className="material-symbols-outlined text-outline">link</span>
              </span>
              <input
                id="url-input"
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://your-long-url.com/very/long/path"
                className="w-full bg-[#0B0B0B] border border-[#292929] text-on-surface font-code-md text-code-md rounded-DEFAULT py-md pl-xl pr-md focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] outline-none transition-colors placeholder:text-on-surface-variant/50"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={shortening}
            className="bg-[#FF6B2C] text-[#FFFFFF] font-label-caps text-label-caps py-md px-xl rounded-DEFAULT hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined">
              {shortening ? 'progress_activity' : 'add_link'}
            </span>
            {shortening ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {lastShortened && (
          <div className="mt-lg p-md bg-[#1E1E1E] border border-border-subtle rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div className="flex-1 min-w-0 text-left">
              <span className="font-label-caps text-[10px] text-[#FF6B2C] block mb-1">Your Short Link is Ready</span>
              <div className="flex items-center gap-sm">
                <span className="font-code-md text-white font-bold truncate">
                  {BASE_URL}/{lastShortened.shortURl}
                </span>
              </div>
              <span className="font-code-sm text-[11px] text-[#A1A1AA] block mt-1 truncate">
                Redirects to: {lastShortened.orignalUrl}
              </span>
            </div>
            <div className="flex gap-sm w-full md:w-auto">
              <button
                onClick={() => handleCopyLink(lastShortened.shortURl)}
                className="btn-primary px-md py-sm rounded text-body-sm font-label-caps flex-grow md:flex-grow-0"
              >
                Copy Link
              </button>
              <a
                href={`${BASE_URL}/${lastShortened.shortURl}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-md py-sm rounded text-body-sm font-label-caps text-center flex-grow md:flex-grow-0"
              >
                Test Redirect
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Metrics Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
        {/* Card 1 */}
        <div className="bg-level-1 border rounded-lg p-lg">
          <div className="flex justify-between items-start mb-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Total Links</p>
            <span className="material-symbols-outlined text-primary-container">link</span>
          </div>
          <p className="font-headline-md text-headline-md text-on-background">{totalLinks}</p>
          <div className="mt-sm flex items-center gap-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span className="font-code-sm text-code-sm">Active links in database</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-level-1 border rounded-lg p-lg">
          <div className="flex justify-between items-start mb-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Total Clicks</p>
            <span className="material-symbols-outlined text-primary-container">ads_click</span>
          </div>
          <p className="font-headline-md text-headline-md text-on-background">{totalClicks}</p>
          <div className="mt-sm flex items-center gap-sm text-tertiary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-code-sm text-code-sm">Total redirection requests</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-level-1 border rounded-lg p-lg">
          <div className="flex justify-between items-start mb-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Avg. Clicks/Link</p>
            <span className="material-symbols-outlined text-primary-container">data_usage</span>
          </div>
          <p className="font-headline-md text-headline-md text-on-background">{avgClicks}</p>
          <div className="mt-sm flex items-center gap-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span className="font-code-sm text-code-sm">Link performance average</span>
          </div>
        </div>
      </section>

      {/* Recent Links Table */}
      <section className="bg-level-1 border rounded-lg overflow-hidden">
        <div className="p-lg border-b border-[#292929] flex justify-between items-center bg-level-2">
          <h3 className="font-headline-sm text-headline-sm text-on-background">Recent Links</h3>
          <Link
            to="/my-links"
            className="text-primary-container font-label-caps text-label-caps flex items-center gap-xs hover:underline"
          >
            View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#292929]">
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant font-normal">Original URL</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant font-normal">Short URL</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant font-normal">Created</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant font-normal text-right">Clicks</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-code-md text-code-md">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-md text-center text-on-surface-variant">
                    Loading links...
                  </td>
                </tr>
              ) : recentLinks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-md text-center text-on-surface-variant">
                    No links shortened yet. Shorten your first link above!
                  </td>
                </tr>
              ) : (
                recentLinks.map((link) => (
                  <tr key={link.id} className="border-b border-[#292929] hover:bg-surface-container-high transition-colors">
                    <td className="p-md text-on-surface max-w-[200px] truncate" title={link.orignalUrl}>
                      {link.orignalUrl}
                    </td>
                    <td className="p-md text-primary-container">
                      <a
                        href={`${BASE_URL}/${link.shortURl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline font-bold text-[#FF6B2C]"
                      >
                        {link.shortURl}
                      </a>
                    </td>
                    <td className="p-md text-on-surface-variant">{formatDate(link.createdDate)}</td>
                    <td className="p-md text-on-surface text-right">{link.clickCount || 0}</td>
                    <td className="p-md text-center">
                      <div className="flex justify-center gap-sm">
                        <button
                          onClick={() => handleCopyLink(link.shortURl)}
                          className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
                          title="Copy Link"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {copiedLink === link.shortURl ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <Link
                          to={`/analytics?shortUrl=${link.shortURl}`}
                          className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
                          title="View Analytics"
                        >
                          <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Toast Alert */}
      <Toast
        show={showToast}
        message={toastMessage}
        description={toastDesc}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  );
}
