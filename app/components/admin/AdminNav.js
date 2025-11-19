'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src="/assets/images/logo2.png"
            alt="Logo"
            style={{height: '48px'}}
            className="me-3"
          />
          <h1 className="h4 mb-0 fw-bold">Savage Squad CMS</h1>
        </div>
        <div className="d-flex align-items-center gap-3">
          <a
            href="/admin"
            className={`nav-link ${pathname === '/admin' ? 'text-primary fw-semibold' : 'text-secondary'}`}
          >
            Dashboard
          </a>
          <a
            href="/admin/editor"
            className={`nav-link ${pathname === '/admin/editor' ? 'text-primary fw-semibold' : 'text-secondary'}`}
          >
            Editor
          </a>
          <a
            href="/admin/testimonials"
            className={`nav-link ${pathname === '/admin/testimonials' ? 'text-primary fw-semibold' : 'text-secondary'}`}
          >
            Testimonials
          </a>
          <a
            href="/admin/faq"
            className={`nav-link ${pathname === '/admin/faq' ? 'text-primary fw-semibold' : 'text-secondary'}`}
          >
            FAQ
          </a>
          <a
            href="/"
            target="_blank"
            className="nav-link text-secondary"
          >
            View Site <i className="fa fa-external-link"></i>
          </a>
          <button
            onClick={handleLogout}
            className="btn btn-link text-danger text-decoration-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
