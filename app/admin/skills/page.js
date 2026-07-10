'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminSkills() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [categories, setCategories] = useState([]);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data?.skills?.categories) setCategories(data.skills.categories);
  }, [data]);

  const handleAddNew = () => {
    setEditingCategoryIndex('new');
    setForm({
      name: '',
      skills: [{ name: '', icon: '' }]
    });
  };

  const handleEdit = (category, index) => {
    setEditingCategoryIndex(index);
    setForm(JSON.parse(JSON.stringify(category)));
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter((_, i) => i !== index);
      saveData({ skills: { categories: updated } }).then(success => {
        if (success) setCategories(updated);
      });
    }
  };

  const handleSave = () => {
    if (!form.name) {
      showToast('Category name is required', 'error');
      return;
    }
    
    let updated;
    if (editingCategoryIndex === 'new') {
      updated = [...categories, form];
    } else {
      updated = categories.map((c, i) => i === editingCategoryIndex ? form : c);
    }
    
    saveData({ skills: { categories: updated } }).then(success => {
      if (success) {
        setCategories(updated);
        setEditingCategoryIndex(null);
        setForm(null);
      }
    });
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...form.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setForm({ ...form, skills: newSkills });
  };

  const addSkill = () => {
    setForm({ ...form, skills: [...form.skills, { name: '', icon: '' }] });
  };

  const removeSkill = (index) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>⚡ Manage Skills</h1>
        {editingCategoryIndex === null && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Category</button>}
      </div>

      {editingCategoryIndex === null ? (
        <div className="admin-card">
          {categories.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No skills found. Add a category!</p>
          ) : (
            categories.map((cat, index) => (
              <div key={index} className="admin-item-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent-green)' }}>{cat.name}</h4>
                  <div className="admin-item-actions">
                    <button className="admin-item-btn" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }} onClick={() => handleEdit(cat, index)}>Edit</button>
                    <button className="admin-item-btn" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }} onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((skill, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {skill.icon} {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="admin-card">
          <h3>{editingCategoryIndex === 'new' ? 'New Category' : 'Edit Category'}</h3>
          
          <div className="admin-form-group">
            <label>Category Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Frontend, Backend, Tools" />
          </div>
          
          <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Skills in this Category</h4>
          
          {form.skills.map((skill, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <input value={skill.icon} onChange={e => handleSkillChange(i, 'icon', e.target.value)} placeholder="Icon (emoji, HTML, etc)" />
              </div>
              <div style={{ flex: 3 }}>
                <input value={skill.name} onChange={e => handleSkillChange(i, 'name', e.target.value)} placeholder="Skill Name (e.g. React.js)" />
              </div>
              <button type="button" className="admin-btn-delete" style={{ padding: '8px 12px' }} onClick={() => removeSkill(i)}>✕</button>
            </div>
          ))}
          
          <button type="button" onClick={addSkill} className="admin-btn-add" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--accent-green)', color: 'var(--accent-green)' }}>+ Add Skill</button>

          <div className="admin-actions" style={{ marginTop: '32px' }}>
            <button className="admin-btn-save" onClick={handleSave}>Save Category</button>
            <button className="admin-btn-delete" onClick={() => setEditingCategoryIndex(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
