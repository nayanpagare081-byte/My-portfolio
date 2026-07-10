'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminEducation() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [education, setEducation] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data?.education) setEducation(data.education);
  }, [data]);

  const handleAddNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      dateRange: '',
      institution: '',
      degree: '',
      score: '',
      description: '',
      skills: ''
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ 
      ...item, 
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || '')
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updated = education.filter(i => i.id !== id);
      saveData({ education: updated }).then(success => {
        if (success) setEducation(updated);
      });
    }
  };

  const handleSave = () => {
    if (!form.institution || !form.degree) {
      showToast('Institution and Degree are required', 'error');
      return;
    }
    
    const itemToSave = {
      ...form,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(s => s) : []
    };

    let updated;
    if (editingId === 'new') {
      updated = [...education, itemToSave];
    } else {
      updated = education.map(i => i.id === editingId ? itemToSave : i);
    }
    
    saveData({ education: updated }).then(success => {
      if (success) {
        setEducation(updated);
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
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>🎓 Manage Education</h1>
        {!editingId && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Education</button>}
      </div>

      {!editingId ? (
        <div className="admin-card">
          {education.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No entries found.</p>
          ) : (
            education.map(item => (
              <div key={item.id} className="admin-item-card">
                <div>
                  <h4>{item.degree}</h4>
                  <p>{item.institution} • {item.dateRange}</p>
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
          <h3>{editingId === 'new' ? 'New Education' : 'Edit Education'}</h3>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Degree / Qualification</label>
              <input value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} placeholder="e.g. B.Tech in Computer Science" />
            </div>
            <div className="admin-form-group">
              <label>Institution</label>
              <input value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} placeholder="e.g. Example University" />
            </div>
          </div>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Date Range</label>
              <input value={form.dateRange} onChange={e => setForm({...form, dateRange: e.target.value})} placeholder="e.g. 2021 - 2025" />
            </div>
            <div className="admin-form-group">
              <label>Grade / Score (Optional)</label>
              <input value={form.score || ''} onChange={e => setForm({...form, score: e.target.value})} placeholder="e.g. 9.5 CGPA, 95%" />
            </div>
          </div>
          
          <div className="admin-form-group">
            <label>Description / Additional Info (Use Enter for new paragraphs)</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. Relevant Coursework, GPA..." rows="4" />
          </div>

          <div className="admin-form-group">
            <label>Skills / Keywords (Comma separated)</label>
            <input value={form.skills || ''} onChange={e => setForm({...form, skills: e.target.value})} placeholder="e.g. Machine Learning, React, Python" />
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Education</button>
            <button className="admin-btn-delete" onClick={() => setEditingId(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
