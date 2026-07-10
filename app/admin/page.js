'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div className="admin-page-title">Loading...</div>;

  const stats = [
    { label: 'Projects', value: data.projects?.length || 0 },
    { label: 'Skills Categories', value: data.skills?.categories?.length || 0 },
    { label: 'Achievements', value: data.achievements?.length || 0 },
    { label: 'Education', value: data.education?.length || 0 },
    { label: 'Certifications', value: data.certifications?.length || 0 },
    { label: 'Prof. Experience', value: data.experience?.professional?.length || 0 },
  ];

  return (
    <div>
      <h1 className="admin-page-title">📊 Dashboard</h1>

      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <div key={i} className="dashboard-stat-card">
            <div className="dashboard-stat-value">{stat.value}</div>
            <div className="dashboard-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>Quick Actions</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Use the sidebar to navigate to any section and edit your portfolio content.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/admin/hero" className="admin-btn-add">Edit Hero</a>
          <a href="/admin/projects" className="admin-btn-add">Manage Projects</a>
          <a href="/admin/skills" className="admin-btn-add">Manage Skills</a>
          <a href="/admin/messages" className="admin-btn-add">View Messages</a>
        </div>
      </div>
    </div>
  );
}
