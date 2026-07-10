'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminExperience() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [experience, setExperience] = useState({ professional: [], college: [] });
  const [editingItem, setEditingItem] = useState(null); // { type, item }

  useEffect(() => {
    if (data?.experience) setExperience(data.experience);
  }, [data]);

  const handleAddNew = (type) => {
    setEditingItem({
      type,
      item: {
        id: Date.now().toString(),
        dateRange: '',
        organization: '',
        location: '',
        role: '',
        responsibilities: [''],
        skills: ['']
      }
    });
  };

  const handleEdit = (type, item) => {
    setEditingItem({ 
      type, 
      item: { ...item, responsibilities: item.responsibilities || [], skills: item.skills || [] } 
    });
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updated = experience[type].filter(i => i.id !== id);
      const newExp = { ...experience, [type]: updated };
      saveData({ experience: newExp }).then(success => {
        if (success) setExperience(newExp);
      });
    }
  };

  const handleSave = () => {
    const { type, item } = editingItem;
    if (!item.role || !item.organization) {
      showToast('Role and Organization are required', 'error');
      return;
    }
    
    let updated;
    const existingIndex = experience[type].findIndex(i => i.id === item.id);
    
    if (existingIndex === -1) {
      updated = [...experience[type], item];
    } else {
      updated = experience[type].map(i => i.id === item.id ? item : i);
    }
    
    const newExp = { ...experience, [type]: updated };
    
    saveData({ experience: newExp }).then(success => {
      if (success) {
        setExperience(newExp);
        setEditingItem(null);
      }
    });
  };

  const handleFormChange = (field, value) => {
    setEditingItem({ ...editingItem, item: { ...editingItem.item, [field]: value } });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...editingItem.item[field]];
    newArray[index] = value;
    handleFormChange(field, newArray);
  };

  const addArrayItem = (field) => {
    handleFormChange(field, [...editingItem.item[field], '']);
  };

  const removeArrayItem = (field, index) => {
    handleFormChange(field, editingItem.item[field].filter((_, i) => i !== index));
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  const renderList = (type, title) => (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button className="admin-btn-add" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleAddNew(type)}>+ Add {type}</button>
      </div>
      
      {experience[type]?.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No entries found.</p>
      ) : (
        experience[type]?.map(item => (
          <div key={item.id} className="admin-item-card">
            <div>
              <h4>{item.role}</h4>
              <p>{item.organization} • {item.dateRange}</p>
            </div>
            <div className="admin-item-actions">
              <button className="admin-item-btn" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }} onClick={() => handleEdit(type, item)}>Edit</button>
              <button className="admin-item-btn" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }} onClick={() => handleDelete(type, item.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      
      <h1 className="admin-page-title">💼 Manage Experience</h1>

      {!editingItem ? (
        <>
          {renderList('professional', 'Professional Experience')}
          {renderList('college', 'College Experience')}
        </>
      ) : (
        <div className="admin-card">
          <h3>Edit {editingItem.type === 'professional' ? 'Professional' : 'College'} Experience</h3>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Role / Title</label>
              <input value={editingItem.item.role} onChange={e => handleFormChange('role', e.target.value)} placeholder="e.g. Software Engineer" />
            </div>
            <div className="admin-form-group">
              <label>Organization</label>
              <input value={editingItem.item.organization} onChange={e => handleFormChange('organization', e.target.value)} placeholder="e.g. Tech Corp" />
            </div>
          </div>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Date Range</label>
              <input value={editingItem.item.dateRange} onChange={e => handleFormChange('dateRange', e.target.value)} placeholder="e.g. 2023 - Present" />
            </div>
            <div className="admin-form-group">
              <label>Location</label>
              <input value={editingItem.item.location} onChange={e => handleFormChange('location', e.target.value)} placeholder="e.g. Hyderabad, India" />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Responsibilities</label>
            {editingItem.item.responsibilities.map((resp, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <textarea value={resp} onChange={e => handleArrayChange('responsibilities', i, e.target.value)} style={{ flex: 1, minHeight: '60px' }} />
                <button type="button" className="admin-btn-delete" style={{ padding: '8px' }} onClick={() => removeArrayItem('responsibilities', i)}>✕</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('responsibilities')} style={{ color: 'var(--accent-green)', fontSize: '0.85rem' }}>+ Add Responsibility</button>
          </div>
          
          <div className="admin-form-group">
            <label>Skills Used</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {editingItem.item.skills.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input value={s} onChange={e => handleArrayChange('skills', i, e.target.value)} style={{ width: '120px', padding: '6px' }} placeholder="e.g. React" />
                  <button type="button" onClick={() => removeArrayItem('skills', i)} style={{ color: '#e74c3c' }}>✕</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addArrayItem('skills')} style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '8px' }}>+ Add Skill</button>
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Experience</button>
            <button className="admin-btn-delete" onClick={() => setEditingItem(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
