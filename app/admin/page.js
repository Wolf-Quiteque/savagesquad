'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import AdminNav from '@/app/components/admin/AdminNav';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  useEffect(() => {
    // Auto-refresh analytics every 30 seconds for real-time stats
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, [days]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/dashboard?days=${days}`);

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setAnalytics(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setError('Failed to load analytics data');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
            {lastUpdated && (
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setDays(7)}
              className={`px-4 py-2 rounded ${days === 7 ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setDays(30)}
              className={`px-4 py-2 rounded ${days === 30 ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDays(90)}
              className={`px-4 py-2 rounded ${days === 90 ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Views</h3>
            <p className="text-4xl font-bold">{analytics?.totals?.total_views || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Unique Visitors</h3>
            <p className="text-4xl font-bold">{analytics?.totals?.unique_visitors || 0}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Daily Traffic</h3>
          {analytics?.daily && analytics.daily.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                <Legend />
                <Line type="monotone" dataKey="total_views" stroke="#8884d8" name="Total Views" />
                <Line type="monotone" dataKey="unique_visitors" stroke="#82ca9d" name="Unique Visitors" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No analytics data available yet</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/admin/editor"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Content Editor →
          </a>
        </div>
      </main>
    </div>
  );
}
