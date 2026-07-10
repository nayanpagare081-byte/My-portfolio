'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminAchievements() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [achievements, setAchievements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data?.achievements) setAchievements(data.achievements);
  }, [data]);

  const handleAddNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: ''
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      const updated = achievements.filter(i => i.id !== id);
      saveData({ achievements: updated }).then(success => {
        if (success) setAchievements(updated);
      });
    }
  };

  const handleSave = () => {
    if (!form.title) {
      showToast('Title is required', 'error');
      return;
    }
    
    let updated;
    if (editingId === 'new') {
      updated = [...achievements, form];
    } else {
      updated = achievements.map(i => i.id === editingId ? form : i);
    }
    
    saveData({ achievements: updated }).then(success => {
      if (success) {
        setAchievements(updated);
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
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>🏆 Manage Achievements</h1>
        {!editingId && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Achievement</button>}
      </div>

      {!editingId ? (
        <div className="admin-card">
          {achievements.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No achievements found.</p>
          ) : (
            achievements.map(item => (
              <div key={item.id} className="admin-item-card">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-item-btn" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }} onClick={() => handleEdit(item)}>Edit</button>
                  <button className="admin-item-btn" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }} onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="admin-card">
          <h3>{editingId === 'new' ? 'New Achievement' : 'Edit Achievement'}</h3>
          
          <div className="admin-form-group">
            <label>Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Winner, Hackathon 2024" />
          </div>
          
          <div className="admin-form-group">
            <label>Subtitle / Date</label>
            <input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} placeholder="e.g. Oct 2024" />
          </div>
          
          <div className="admin-form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Briefly describe the achievement..." />
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Achievement</button>
            <button className="admin-btn-delete" onClick={() => setEditingId(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
