'use client';
import { useState, useEffect, useCallback } from 'react';

export function useAdminData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    } catch {
      showToast('Failed to load data', 'error');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveData = async (updates) => {
    try {
      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setData((prev) => ({ ...prev, ...updates }));
        showToast('Saved successfully!', 'success');
        return true;
      } else if (res.status === 401) {
        showToast('Unauthorized. Please login again.', 'error');
        window.location.href = '/admin/login';
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    return false;
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { data, loading, saveData, toast, showToast, refetch: fetchData };
}
