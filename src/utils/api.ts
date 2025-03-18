
// Base API utilities
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export const fetchWithAuth = async (endpoint: string, options = {}) => {
  // In a real app, you would get this token from localStorage or an auth context
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};
