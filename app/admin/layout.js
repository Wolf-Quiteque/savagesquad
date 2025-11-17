'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  useEffect(() => {
    // Load Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = '/assets/css/bootstrap-lib/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    // Load Font Awesome
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = '/assets/font-awesome-lib/icon/font-awesome.min.css';
    document.head.appendChild(fontAwesomeLink);

    // Add custom admin styles
    const style = document.createElement('style');
    style.textContent = `
      .admin-container {
        min-height: 100vh;
        background-color: #f8f9fa;
      }
      .admin-nav {
        background-color: #343a40;
        color: white;
        padding: 1rem;
      }
      .admin-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .stat-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 1.5rem;
      }
      .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #343a40;
      }
      .stat-label {
        color: #6c757d;
        font-size: 0.875rem;
        text-transform: uppercase;
      }
    `;
    document.head.appendChild(style);

    return () => {
      bootstrapLink.remove();
      fontAwesomeLink.remove();
      style.remove();
    };
  }, []);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
