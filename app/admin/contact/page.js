'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminContact() {
  const { data, loading, saveData, toast } = useAdminData();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data?.contact) setForm(data.contact);
  }, [data]);

  const handleSave = () => {
    saveData({ contact: form });
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      <h1 className="admin-page-title">📬 Edit Contact Section</h1>

      <div className="admin-card">
        <h3>Contact Information</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Public Email Address</label>
            <input 
              value={form.email || ''} 
              onChange={e => setForm({...form, email: e.target.value})} 
              placeholder="e.g. hello@example.com"
            />
          </div>
          <div className="admin-form-group">
            <label>Location</label>
            <input 
              value={form.location || ''} 
              onChange={e => setForm({...form, location: e.target.value})} 
              placeholder="e.g. Hyderabad, India"
            />
          </div>
        </div>

        <h3 style={{ marginTop: '32px' }}>Social Links (Footer & Contact Page)</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>LinkedIn URL</label>
            <input 
              value={form.socialLinks?.linkedin || ''} 
              onChange={e => setForm({...form, socialLinks: {...form.socialLinks, linkedin: e.target.value}})} 
            />
          </div>
          <div className="admin-form-group">
            <label>GitHub URL</label>
            <input 
              value={form.socialLinks?.github || ''} 
              onChange={e => setForm({...form, socialLinks: {...form.socialLinks, github: e.target.value}})} 
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Email Link (mailto:)</label>
          <input 
            value={form.socialLinks?.email || ''} 
            onChange={e => setForm({...form, socialLinks: {...form.socialLinks, email: e.target.value}})} 
          />
        </div>

        <div className="admin-actions" style={{ marginTop: '32px' }}>
          <button className="admin-btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
