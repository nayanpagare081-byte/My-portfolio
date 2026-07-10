'use client';
import { useState, useEffect } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => {
        if (res.ok) return res.json();
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('Failed to fetch messages');
      })
      .then(data => {
        // Sort newest first
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      <h1 className="admin-page-title">💬 Messages & Inquiries</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Messages submitted through your portfolio contact form.
      </p>

      {messages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
          <h3 style={{ margin: 0 }}>No messages yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>When someone contacts you, their message will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div key={msg.id} className="admin-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{msg.name}</h3>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span>✉ {msg.email}</span>
                    <span>📱 {msg.mobile}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.03)', 
                padding: '16px', 
                borderRadius: '8px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}>
                {msg.message}
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <a 
                  href={`mailto:${msg.email}?subject=Reply to your inquiry from my portfolio`}
                  className="admin-btn-save" 
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
