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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/logo2.png"
            alt="Logo"
            className="h-12"
          />
          <h1 className="text-xl font-bold">Savage Squad CMS</h1>
        </div>
        <div className="flex gap-6 items-center">
          <a
            href="/admin"
            className={`hover:underline ${pathname === '/admin' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
          >
            Dashboard
          </a>
          <a
            href="/admin/editor"
            className={`hover:underline ${pathname === '/admin/editor' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
          >
            Editor
          </a>
          <a
            href="/"
            target="_blank"
            className="text-gray-600 hover:underline"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
