'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../admin.css';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Hero', href: '/admin/hero', icon: '🏠' },
  { label: 'About', href: '/admin/about', icon: '👤' },
  { label: 'Projects', href: '/admin/projects', icon: '💻' },
  { label: 'Experience', href: '/admin/experience', icon: '💼' },
  { label: 'Skills', href: '/admin/skills', icon: '⚡' },
  { label: 'Education', href: '/admin/education', icon: '🎓' },
  { label: 'Certifications', href: '/admin/certifications', icon: '📜' },
  { label: 'Events', href: '/admin/events', icon: '🎟️' },
  { label: 'Contact', href: '/admin/contact', icon: '📬' },
  { label: 'Messages', href: '/admin/messages', icon: '💬' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [toast, setToast] = useState(null);

  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>⚙️ Admin Panel</h2>
          <p>Portfolio Management</p>
        </div>
        <nav>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', marginTop: '16px' }}>
          <button onClick={handleLogout} className="admin-btn-delete" style={{ width: '100%', textAlign: 'center' }}>
            Logout
          </button>
          <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ← View Portfolio
          </a>
        </div>
      </aside>
      <main className="admin-main">
        {toast && (
          <div className="toast-container">
            <div className={`toast toast-${toast.type}`}>{toast.message}</div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
