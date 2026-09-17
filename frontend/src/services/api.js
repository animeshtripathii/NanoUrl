export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';


const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Public auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/public/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Invalid email or password');
    }
    return response.json(); // returns { token: "..." }
  },

  register: async (username, email, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/public/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Registration failed');
    }
    return response.text(); // returns success string
  },

  // Protected URL endpoints
  shortenUrl: async (originalUrl) => {
    const response = await fetch(`${BASE_URL}/api/urls/shorten`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ originalUrl }),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to shorten URL');
    }
    return response.json(); // returns UrlMappingDTO
  },

  getUserUrls: async () => {
    const response = await fetch(`${BASE_URL}/api/urls/myurls`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch links');
    }
    return response.json(); // returns List<UrlMappingDTO>
  },

  getUrlAnalytics: async (shortUrl, startDate, endDate) => {
    const response = await fetch(`${BASE_URL}/api/urls/analytics/${shortUrl}?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch analytics');
    }
    return response.json(); // returns List<ClickEventDTO>
  },
};
