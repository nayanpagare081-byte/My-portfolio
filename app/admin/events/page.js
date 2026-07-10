'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminEvents() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
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
    if (data?.events) setEvents(data.events);
  }, [data]);

  const handleAddNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '',
      organization: '',
      category: '',
      link: ''
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter(i => i.id !== id);
      saveData({ events: updated }).then(success => {
        if (success) setEvents(updated);
      });
    }
  };

  const handleSave = () => {
    if (!form.title || !form.organization || !form.category) {
      showToast('Title, Organization, and Category are required', 'error');
      return;
    }
    
    let updated;
    if (editingId === 'new') {
      updated = [...events, form];
    } else {
      updated = events.map(i => i.id === editingId ? form : i);
    }
    
    saveData({ events: updated }).then(success => {
      if (success) {
        setEvents(updated);
        setEditingId(null);
        setForm(null);
      }
    });
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>🎟️ Manage Events</h1>
        {!editingId && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Event</button>}
      </div>

      {!editingId ? (
        <div className="admin-card">
          {events.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No events found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {events.map(item => (
                <div key={item.id} className="admin-item-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ marginBottom: '4px' }}>{item.title}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{item.organization}</p>
                    <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 10px', background: 'var(--accent-green-subtle)', color: 'var(--accent-green)', borderRadius: '100px', fontSize: '12px' }}>
                      {item.category}
                    </span>
                  </div>
                  <div className="admin-item-actions" style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <button className="admin-item-btn" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }} onClick={() => handleEdit(item)}>Edit</button>
                    <button className="admin-item-btn" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }} onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="admin-card">
          <h3>{editingId === 'new' ? 'New Event' : 'Edit Event'}</h3>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Event Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Agentic AI Day" />
            </div>
            <div className="admin-form-group">
              <label>Organization</label>
              <input value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} placeholder="e.g. Google" />
            </div>
          </div>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category Tag</label>
              <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Hackathon, Workshop, Conference" />
            </div>
            <div className="admin-form-group">
              <label>Link (Upload or URL)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  style={{ flex: 1 }}
                  value={form.link || ''} 
                  onChange={e => setForm({...form, link: e.target.value})} 
                  placeholder="e.g. https://example.com" 
                />
                <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                  <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, 'link')} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Event</button>
            <button className="admin-btn-delete" onClick={() => setEditingId(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
