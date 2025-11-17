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
      <div className="admin-container d-flex align-items-center justify-content-center">
        <div className="h4">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container d-flex align-items-center justify-content-center">
        <div className="h4 text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="container py-4">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h2 fw-bold">Analytics Dashboard</h2>
            {lastUpdated && (
              <span className="text-muted small">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="btn-group mb-4" role="group">
            <button
              onClick={() => setDays(7)}
              className={`btn ${days === 7 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setDays(30)}
              className={`btn ${days === 30 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDays(90)}
              className={`btn ${days === 90 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="stat-card">
              <div className="stat-label mb-2">Total Views</div>
              <div className="stat-value">{analytics?.totals?.total_views || 0}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stat-card">
              <div className="stat-label mb-2">Unique Visitors</div>
              <div className="stat-value">{analytics?.totals?.unique_visitors || 0}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="admin-card">
          <h3 className="h5 fw-bold mb-4">Daily Traffic</h3>
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
            <p className="text-muted text-center py-5">No analytics data available yet</p>
          )}
        </div>

        <div className="text-center mt-4">
          <a
            href="/admin/editor"
            className="btn btn-primary btn-lg"
          >
            Go to Content Editor →
          </a>
        </div>
      </main>
    </div>
  );
}
