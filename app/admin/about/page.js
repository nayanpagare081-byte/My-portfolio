'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminAbout() {
  const { data, loading, saveData, toast } = useAdminData();
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
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
        setForm({ ...form, photoUrl: result.url });
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
    if (data?.about) setForm(data.about);
  }, [data]);

  const handleSave = () => saveData({ about: form });

  const updateBio = (index, value) => {
    const newBio = [...(form.bio || [])];
    newBio[index] = value;
    setForm({ ...form, bio: newBio });
  };

  const addBioParagraph = () => setForm({ ...form, bio: [...(form.bio || []), ''] });
  const removeBioParagraph = (i) => setForm({ ...form, bio: form.bio.filter((_, idx) => idx !== i) });

  const updateStat = (index, field, value) => {
    const newStats = [...(form.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => setForm({ ...form, stats: [...(form.stats || []), { value: '', label: '' }] });
  const removeStat = (i) => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      <h1 className="admin-page-title">👤 Edit About Section</h1>

      <div className="admin-card">
        <h3>Bio Paragraphs</h3>
        {form.bio?.map((p, i) => (
          <div key={i} className="admin-form-group" style={{ display: 'flex', gap: '8px' }}>
            <textarea value={p} onChange={(e) => updateBio(i, e.target.value)} style={{ flex: 1 }} />
            <button className="admin-btn-delete" onClick={() => removeBioParagraph(i)} style={{ padding: '8px 12px', alignSelf: 'start' }}>✕</button>
          </div>
        ))}
        <button className="admin-btn-add" onClick={addBioParagraph}>+ Add Paragraph</button>
      </div>

      <div className="admin-card">
        <h3>Stats</h3>
        {form.stats?.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'end' }}>
            <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Value</label>
              <input value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
            </div>
            <div className="admin-form-group" style={{ flex: 2, marginBottom: 0 }}>
              <label>Label</label>
              <input value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
            </div>
            <button className="admin-btn-delete" onClick={() => removeStat(i)} style={{ padding: '8px 12px' }}>✕</button>
          </div>
        ))}
        <button className="admin-btn-add" onClick={addStat}>+ Add Stat</button>
      </div>

      <div className="admin-card">
        <h3>Contact Info</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Email</label>
            <input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Location</label>
            <input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
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
              <input type="file" accept="image/*,video/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn-save" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
