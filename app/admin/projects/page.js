'use client';
import { useState, useEffect } from 'react';
import { useAdminData } from '@/lib/useAdminData';

export default function AdminProjects() {
  const { data, loading, saveData, toast, showToast } = useAdminData();
  const [projects, setProjects] = useState([]);
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
    if (data?.projects) setProjects(data.projects);
  }, [data]);

  const handleAddNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      description: '',
      features: [''],
      tech: [''],
      githubUrl: '',
      liveUrl: '',
      imageUrl: ''
    });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({ ...project, features: project.features || [], tech: project.tech || [] });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      saveData({ projects: updated }).then(success => {
        if (success) setProjects(updated);
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
      updated = [...projects, form];
    } else {
      updated = projects.map(p => p.id === editingId ? form : p);
    }
    
    saveData({ projects: updated }).then(success => {
      if (success) {
        setProjects(updated);
        setEditingId(null);
        setForm(null);
      }
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...form[field]];
    newArray[index] = value;
    setForm({ ...form, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  if (loading) return <div className="admin-page-title">Loading...</div>;

  return (
    <div>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <h1 className="admin-page-title" style={{ border: 'none', margin: 0, padding: 0 }}>💻 Manage Projects</h1>
        {!editingId && <button className="admin-btn-add" onClick={handleAddNew}>+ Add Project</button>}
      </div>

      {!editingId ? (
        <div className="admin-card">
          {projects.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No projects found. Add one!</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="admin-item-card">
                <div>
                  <h4>{project.title}</h4>
                  <p>{project.subtitle}</p>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-item-btn" style={{ background: 'var(--accent-green-subtle)', color: 'var(--accent-green)' }} onClick={() => handleEdit(project)}>Edit</button>
                  <button className="admin-item-btn" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }} onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="admin-card">
          <h3>{editingId === 'new' ? 'New Project' : 'Edit Project'}</h3>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. E-Commerce Platform" />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} placeholder="e.g. Full Stack Shopping Experience" />
            </div>
          </div>
          
          <div className="admin-form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Image URL (Optional or Upload)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  style={{ flex: 1 }}
                  value={form.imageUrl || ''} 
                  onChange={e => setForm({...form, imageUrl: e.target.value})} 
                  placeholder="/images/project1.png" 
                />
                <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                  <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>GitHub URL (or Upload)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  style={{ flex: 1 }}
                  value={form.githubUrl || ''} 
                  onChange={e => setForm({...form, githubUrl: e.target.value})} 
                />
                <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                  <input type="file" onChange={(e) => handleFileUpload(e, 'githubUrl')} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
            <div className="admin-form-group">
              <label>Live Demo URL (or Upload)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  style={{ flex: 1 }}
                  value={form.liveUrl || ''} 
                  onChange={e => setForm({...form, liveUrl: e.target.value})} 
                />
                <label className="admin-btn-save" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1, color: '#000' }}>
                  {uploading ? 'Uploading...' : 'Upload File'}
                  <input type="file" onChange={(e) => handleFileUpload(e, 'liveUrl')} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Key Features</label>
              {form.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={f} onChange={e => handleArrayChange('features', i, e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="admin-btn-delete" style={{ padding: '8px' }} onClick={() => removeArrayItem('features', i)}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('features')} style={{ color: 'var(--accent-green)', fontSize: '0.85rem' }}>+ Add Feature</button>
            </div>
            
            <div className="admin-form-group">
              <label>Tech Stack</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {form.tech.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <input value={t} onChange={e => handleArrayChange('tech', i, e.target.value)} style={{ width: '120px', padding: '6px' }} placeholder="e.g. React" />
                    <button type="button" onClick={() => removeArrayItem('tech', i)} style={{ color: '#e74c3c' }}>✕</button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addArrayItem('tech')} style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '8px' }}>+ Add Tech</button>
            </div>
          </div>

          <div className="admin-actions">
            <button className="admin-btn-save" onClick={handleSave}>Save Project</button>
            <button className="admin-btn-delete" onClick={() => setEditingId(null)} style={{ border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
