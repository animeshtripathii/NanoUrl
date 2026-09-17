import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, BASE_URL } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialShortUrl = searchParams.get('shortUrl') || '';

  const [links, setLinks] = useState([]);
  const [selectedShortUrl, setSelectedShortUrl] = useState(initialShortUrl);
  const [period, setPeriod] = useState('7'); // '7' or '30' or '365'
  const [analyticsData, setAnalyticsData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const formatLocalISO = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  // Load user links to select from
  useEffect(() => {
    const loadLinks = async () => {
      setLoadingLinks(true);
      try {
        const data = await api.getUserUrls();
        setLinks(data);
        if (data.length > 0 && !initialShortUrl && !selectedShortUrl) {
          setSelectedShortUrl(data[0].shortURl);
        }
      } catch (err) {
        console.error('Failed to load links for dropdown', err);
      } finally {
        setLoadingLinks(false);
      }
    };
    loadLinks();
  }, []);

  // Update selection if query param changes
  useEffect(() => {
    const urlParam = searchParams.get('shortUrl');
    if (urlParam) {
      setSelectedShortUrl(urlParam);
    }
  }, [searchParams]);

  // Load analytics when selection or period changes
  useEffect(() => {
    if (!selectedShortUrl) return;

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const end = new Date();
        const start = new Date();
        const days = parseInt(period, 10);
        start.setDate(start.getDate() - days);

        const startDateStr = formatLocalISO(start);
        const endDateStr = formatLocalISO(end);

        const data = await api.getUrlAnalytics(selectedShortUrl, startDateStr, endDateStr);
        setAnalyticsData(data || []);
      } catch (err) {
        console.error('Failed to load analytics', err);
        setToastType('error');
        setToastMessage('Analytics Load Failed');
        setToastDesc(err.message || 'Error occurred while fetching analytics');
        setShowToast(true);
        setAnalyticsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [selectedShortUrl, period]);

  // Process chart data
  const daysCount = parseInt(period, 10);
  
  const generateLabelsAndData = () => {
    const labels = [];
    const counts = [];
    
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      
      let displayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (daysCount > 7) {
        displayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      
      labels.push(displayLabel);

      const match = analyticsData.find((item) => {
        if (Array.isArray(item.clickDate)) {
          const [y, m, day] = item.clickDate;
          const pad = (n) => String(n).padStart(2, '0');
          return `${y}-${pad(m)}-${pad(day)}` === dateStr;
        }
        return item.clickDate === dateStr;
      });

      counts.push(match ? match.count : 0);
    }

    return { labels, counts };
  };

  const { labels: chartLabels, counts: chartDataPoints } = generateLabelsAndData();

  const totalClicksSelected = chartDataPoints.reduce((sum, val) => sum + val, 0);

  const selectedLinkDetails = links.find((l) => l.shortURl === selectedShortUrl);
  const selectedLinkTotalClicks = selectedLinkDetails ? selectedLinkDetails.clickCount : 0;
  const selectedLinkCreatedDate = selectedLinkDetails
    ? new Date(selectedLinkDetails.createdDate).toLocaleDateString()
    : 'N/A';

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Clicks',
        data: chartDataPoints,
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(9, 9, 11, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: {
          family: 'Space Grotesk',
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: 'JetBrains Mono',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#a1a1aa',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
        ticks: {
          color: '#a1a1aa',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
          precision: 0,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const totalLinksCount = links.length;
  const allLinksTotalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  const avgClicksCount = totalLinksCount > 0 ? (allLinksTotalClicks / totalLinksCount).toFixed(1) : '0.0';

  return (
    <Layout>
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/70 border-b border-white/10 pb-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-lg">
        <div>
          <h2 className="font-headline-md text-headline-md text-white font-bold">Analytics Overview</h2>
          {selectedShortUrl && (
            <p className="font-code-sm text-code-sm text-zinc-300 mt-1">
              Active Link: <span className="text-white font-bold">{BASE_URL}/{selectedShortUrl}</span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-md w-full sm:w-auto">
          {links.length > 0 && (
            <select
              value={selectedShortUrl}
              onChange={(e) => {
                setSelectedShortUrl(e.target.value);
                setSearchParams({ shortUrl: e.target.value });
              }}
              className="glass-input rounded-xl font-code-sm text-code-sm text-white px-md py-sm flex-grow sm:flex-grow-0 min-w-[160px] border border-white/15 focus:border-white"
            >
              {links.map((link) => (
                <option key={link.id} value={link.shortURl} className="bg-zinc-950 text-white">
                  {link.shortURl}
                </option>
              ))}
            </select>
          )}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="glass-input rounded-xl font-code-sm text-code-sm text-white px-md py-sm border border-white/15 focus:border-white"
          >
            <option value="7" className="bg-zinc-950 text-white">Last 7 Days</option>
            <option value="30" className="bg-zinc-950 text-white">Last 30 Days</option>
            <option value="365" className="bg-zinc-950 text-white">This Year</option>
          </select>
        </div>
      </header>

      <div className="space-y-2xl">
        {/* Metrics Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="glass-card p-md rounded-2xl flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-zinc-400">Selected Link Clicks (All Time)</span>
              <div className="p-2 rounded-lg bg-white/10 text-white border border-white/10">
                <span className="material-symbols-outlined">touch_app</span>
              </div>
            </div>
            <div className="font-headline-md text-headline-md text-white font-bold">
              {selectedShortUrl ? selectedLinkTotalClicks : 0}
            </div>
            <div className="font-code-sm text-code-sm text-zinc-400">
              Created on: {selectedLinkCreatedDate}
            </div>
          </div>

          <div className="glass-card p-md rounded-2xl flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-zinc-400">Total Account Links</span>
              <div className="p-2 rounded-lg bg-white/10 text-white border border-white/10">
                <span className="material-symbols-outlined">link</span>
              </div>
            </div>
            <div className="font-headline-md text-headline-md text-white font-bold">{totalLinksCount}</div>
            <div className="font-code-sm text-code-sm text-zinc-400">
              Across user account
            </div>
          </div>

          <div className="glass-card p-md rounded-2xl flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-zinc-400">Account Avg. Clicks/Link</span>
              <div className="p-2 rounded-lg bg-white/10 text-white border border-white/10">
                <span className="material-symbols-outlined">bar_chart</span>
              </div>
            </div>
            <div className="font-headline-md text-headline-md text-white font-bold">{avgClicksCount}</div>
            <div className="font-code-sm text-code-sm text-zinc-400">
              Aggregate performance
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="glass-panel rounded-2xl flex flex-col border border-white/10 overflow-hidden">
          <div className="border-b border-white/10 px-lg py-md flex justify-between items-center bg-white/5">
            <h3 className="font-headline-sm text-headline-sm text-white font-bold">
              Clicks in Period: <span className="text-white underline">{totalClicksSelected}</span>
            </h3>
          </div>
          <div className="p-lg h-96 w-full relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-zinc-300">
                <span className="material-symbols-outlined animate-spin text-[32px] mr-2">progress_activity</span>
                Loading chart data...
              </div>
            ) : !selectedShortUrl ? (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-code-sm">
                No short URL selected. Create a link to view analytics.
              </div>
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </div>
        </section>

        {/* Data Table Section */}
        <section className="glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10">
          <div className="border-b border-white/10 px-lg py-md flex justify-between items-center bg-white/5">
            <h3 className="font-headline-sm text-headline-sm text-white font-bold">Link Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-label-caps text-label-caps text-zinc-400">
                  <th className="py-md px-lg font-normal">Short URL</th>
                  <th className="py-md px-lg font-normal">Original URL</th>
                  <th className="py-md px-lg font-normal text-right">Total Clicks</th>
                  <th className="py-md px-lg font-normal text-center">Status</th>
                </tr>
              </thead>
              <tbody className="font-code-md text-code-md text-white">
                {links.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-md px-lg text-center text-zinc-400">
                      No links shortened yet.
                    </td>
                  </tr>
                ) : (
                  links.map((link) => (
                    <tr
                      key={link.id}
                      onClick={() => {
                        setSelectedShortUrl(link.shortURl);
                        setSearchParams({ shortUrl: link.shortURl });
                      }}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                        selectedShortUrl === link.shortURl ? 'bg-white/10 border-l-4 border-white' : ''
                      }`}
                    >
                      <td className="py-md px-lg text-white font-bold">{link.shortURl}</td>
                      <td className="py-md px-lg text-zinc-300 truncate max-w-xs" title={link.orignalUrl}>
                        {link.orignalUrl}
                      </td>
                      <td className="py-md px-lg text-right font-bold">{link.clickCount || 0}</td>
                      <td className="py-md px-lg text-center">
                        <span className="inline-block px-sm py-xs rounded-md bg-white/10 border border-white/20 text-white font-code-sm text-code-sm">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
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
