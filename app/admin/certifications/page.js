'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminCertifications() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [certifications, setCertifications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data?.certifications) setCertifications(data.certifications);
  }, [data]);

  const handleAddNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '',
      issuer: '',
      category: ''
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      const updated = certifications.filter(i => i.id !== id);
      saveData({ certifications: updated }).then(success => {
        if (success) setCertifications(updated);
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
      updated = [...certifications, form];
    } else {
      updated = certifications.map(i => i.id === editingId ? form : i);
    }
    
    saveData({ certifications: updated }).then(success => {
      if (success) {
        setCertifications(updated);
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
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>📜 Manage Certifications</h1>
        {!editingId && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Certification</button>}
      </div>

      {!editingId ? (
        <div className="admin-card">
          {certifications.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No certifications found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {certifications.map(item => (
                <div key={item.id} className="admin-item-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.issuer}</p>
                    <span className="certification-category" style={{ display: 'inline-block', marginTop: '8px' }}>{item.category}</span>
                  </div>
                  <div className="admin-item-actions" style={{ justifyContent: 'flex-start', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
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
          <h3>{editingId === 'new' ? 'New Certification' : 'Edit Certification'}</h3>
          
          <div className="admin-form-group">
            <label>Certification Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. AWS Certified Solutions Architect" />
          </div>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Issuer / Platform</label>
              <input value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} placeholder="e.g. Amazon Web Services" />
            </div>
            <div className="admin-form-group">
              <label>Category Tag</label>
              <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Cloud Computing" />
            </div>
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Certification</button>
            <button className="admin-btn-delete" onClick={() => setEditingId(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
