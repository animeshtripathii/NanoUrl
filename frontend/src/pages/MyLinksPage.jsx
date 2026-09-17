import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, BASE_URL } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

export default function MyLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');
  const [copiedLink, setCopiedLink] = useState('');

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await api.getUserUrls();
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

  // Filter links
  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      (link.orignalUrl && link.orignalUrl.toLowerCase().includes(query)) ||
      (link.shortURl && link.shortURl.toLowerCase().includes(query))
    );
  });

  // Pagination calculations
  const totalItems = filteredLinks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const totalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);

  return (
    <Layout>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-md">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
            My Links
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Manage, track, and analyze your shortened URLs.
          </p>
        </div>
        {/* Tools: Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-sm w-full md:w-auto">
          <div className="surface-input rounded-DEFAULT flex items-center px-md py-sm flex-1 md:w-64 transition-colors border border-[#292929]">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none outline-none text-on-background font-code-md text-code-md w-full placeholder:text-on-surface-variant/50 focus:ring-0 p-0"
              placeholder="Search links..."
            />
          </div>
          <button className="btn-secondary rounded-DEFAULT px-md py-sm flex items-center justify-center gap-sm font-label-caps text-label-caps hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-2xl">
        <div className="surface-card rounded-lg p-lg bg-level-1">
          <div className="flex justify-between items-start mb-md border-b border-[#292929] pb-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Total Clicks (All Time)</span>
            <span className="material-symbols-outlined text-primary text-[20px] text-accent-primary">touch_app</span>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">{totalClicks}</div>
          <div className="font-body-sm text-body-sm text-tertiary mt-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            Link redirection click history
          </div>
        </div>

        <div className="surface-card rounded-lg p-lg bg-level-1">
          <div className="flex justify-between items-start mb-md border-b border-[#292929] pb-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Active Links</span>
            <span className="material-symbols-outlined text-primary text-[20px] text-accent-primary">link</span>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">{links.length}</div>
          <div className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Across user account</div>
        </div>
      </div>

      {/* Links Table Container */}
      <div className="surface-card rounded-lg overflow-hidden bg-level-1">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#292929]">
                <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant w-1/3">Short URL</th>
                <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant w-1/3">Original Destination</th>
                <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant w-1/6">Clicks</th>
                <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant w-1/6">Created</th>
                <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-md px-lg text-center text-on-surface-variant">
                    Loading links...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-md px-lg text-center text-on-surface-variant">
                    No links found matching your query.
                  </td>
                </tr>
              ) : (
                currentItems.map((link) => (
                  <tr key={link.id} className="data-table-row hover:bg-surface-container-high transition-colors group">
                    <td className="py-md px-lg">
                      <div className="flex items-center gap-sm">
                        <a
                          href={`${BASE_URL}/${link.shortURl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-code-md text-code-md text-primary bg-[#1E1E1E] px-xs py-xs rounded border border-[#333333] text-accent-primary hover:underline font-bold"
                        >
                          {link.shortURl}
                        </a>
                        <span className="chip-active font-code-sm text-code-sm px-xs py-xs rounded">Active</span>
                      </div>
                    </td>
                    <td className="py-md px-lg">
                      <div
                        className="truncate max-w-[200px] md:max-w-[300px] text-on-surface-variant"
                        title={link.orignalUrl}
                      >
                        {link.orignalUrl}
                      </div>
                    </td>
                    <td className="py-md px-lg text-on-background">{link.clickCount || 0}</td>
                    <td className="py-md px-lg text-on-surface-variant">{formatDate(link.createdDate)}</td>
                    <td className="py-md px-lg text-right">
                      <div className="flex items-center justify-end gap-sm opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyLink(link.shortURl)}
                          className="p-xs hover:text-primary transition-colors flex items-center"
                          title="Copy"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {copiedLink === link.shortURl ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <Link
                          to={`/analytics?shortUrl=${link.shortURl}`}
                          className="p-xs hover:text-tertiary transition-colors flex items-center"
                          title="Analytics"
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

        {/* Mobile Cards View */}
        <div className="block md:hidden space-y-md p-md">
          {loading ? (
            <div className="text-center text-on-surface-variant py-md">Loading links...</div>
          ) : currentItems.length === 0 ? (
            <div className="text-center text-on-surface-variant py-md">No links found matching your query.</div>
          ) : (
            currentItems.map((link) => (
              <div key={link.id} className="bg-[#1E1E1E] border border-border-subtle p-md rounded-lg space-y-sm text-left">
                <div className="flex justify-between items-center">
                  <a
                    href={`${BASE_URL}/${link.shortURl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-code-md text-accent-primary font-bold hover:underline"
                  >
                    {link.shortURl}
                  </a>
                  <span className="chip-active font-code-sm text-code-sm px-xs py-xs rounded">Active</span>
                </div>
                <div className="font-code-sm text-[11px] text-[#A1A1AA] truncate">
                  Original: {link.orignalUrl}
                </div>
                <div className="flex justify-between items-center pt-xs border-t border-border-subtle font-code-sm text-code-sm">
                  <span>Clicks: <strong className="text-white">{link.clickCount || 0}</strong></span>
                  <span>{formatDate(link.createdDate)}</span>
                </div>
                <div className="flex gap-sm justify-end pt-xs">
                  <button
                    onClick={() => handleCopyLink(link.shortURl)}
                    className="p-xs text-on-surface-variant hover:text-white"
                    title="Copy"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copiedLink === link.shortURl ? 'check' : 'content_copy'}
                    </span>
                  </button>
                  <Link
                    to={`/analytics?shortUrl=${link.shortURl}`}
                    className="p-xs text-on-surface-variant hover:text-white"
                    title="Analytics"
                  >
                    <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-md border-t border-[#292929] flex justify-between items-center bg-[#0B0B0B]">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Showing {totalItems > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} links
          </span>
          <div className="flex gap-xs">
            <button
              onClick={handlePrevPage}
              className="btn-secondary px-sm py-xs rounded flex items-center justify-center disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={handleNextPage}
              className="btn-secondary px-sm py-xs rounded flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

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
