'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminHero() {
  const { data, loading, saveData, toast } = useAdminData();
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        setForm(prev => ({ ...prev, [field]: result.url }));
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (data?.hero) setForm(data.hero);
  }, [data]);

  const handleSave = () => {
    saveData({ hero: form });
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      <h1 className="admin-page-title">🏠 Edit Hero Section</h1>

      <div className="admin-card">
        <h3>Hero Content</h3>
        <div className="admin-form-group">
          <label>Badge Text</label>
          <input value={form.badge || ''} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Greeting</label>
          <input value={form.greeting || ''} onChange={(e) => setForm({ ...form, greeting: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Full Name</label>
            <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Role / Title</label>
            <input value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Bio</label>
          <textarea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Marquee Text</label>
          <input value={form.marqueeText || ''} onChange={(e) => setForm({ ...form, marqueeText: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Resume URL (Upload or Link)</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              style={{ flex: 1 }}
              value={form.resumeUrl || ''} 
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} 
            />
            <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
              {uploading ? 'Uploading...' : 'Upload File'}
              <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, 'resumeUrl')} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>
        </div>
        <div className="admin-form-group">
          <label>Photo URL (or Upload)</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              style={{ flex: 1 }}
              value={form.photoUrl || ''} 
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} 
            />
            <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
              {uploading ? 'Uploading...' : 'Upload File'}
              <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUpload(e, 'photoUrl')} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>
        </div>

        <h3 style={{ marginTop: '28px' }}>Social Links</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>LinkedIn URL</label>
            <input value={form.socialLinks?.linkedin || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} />
          </div>
          <div className="admin-form-group">
            <label>GitHub URL</label>
            <input value={form.socialLinks?.github || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })} />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Email (mailto: link)</label>
          <input value={form.socialLinks?.email || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, email: e.target.value } })} />
        </div>

        <div className="admin-actions">
          <button className="admin-btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
