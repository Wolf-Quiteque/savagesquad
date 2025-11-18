'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FAQManager() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    active: true
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchFAQs();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check-auth');
      if (!res.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    }
  };

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingFaq
        ? `/api/faq/${editingFaq._id}`
        : '/api/faq';

      const method = editingFaq ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchFAQs();
        setShowModal(false);
        resetForm();
        alert(editingFaq ? 'FAQ updated successfully!' : 'FAQ created successfully!');
      } else {
        alert('Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Error saving FAQ');
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order || 0,
      active: faq.active !== false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        await fetchFAQs();
        alert('FAQ deleted successfully!');
      } else {
        alert('Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Error deleting FAQ');
    }
  };

  const toggleActive = async (faq) => {
    try {
      const res = await fetch(`/api/faq/${faq._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faq, active: !faq.active })
      });

      if (res.ok) {
        await fetchFAQs();
      }
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      order: 0,
      active: true
    });
    setEditingFaq(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a1929', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>FAQ Management</h1>
            <p style={{ color: '#8b9cb6' }}>Manage your frequently asked questions</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => router.push('/admin/dashboard')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#1e3a5f',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              + Add New FAQ
            </button>
          </div>
        </div>

        {/* FAQ List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading FAQs...</div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs.length === 0 ? (
              <div style={{
                background: '#1e3a5f',
                padding: '3rem',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#8b9cb6'
              }}>
                No FAQs yet. Click "Add New FAQ" to create one.
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  style={{
                    background: '#1e3a5f',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: faq.active ? '2px solid #667eea' : '2px solid #3d5a80',
                    opacity: faq.active ? 1 : 0.6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{
                          background: '#667eea',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          #{faq.order || index + 1}
                        </span>
                        <span style={{
                          background: faq.active ? '#10b981' : '#ef4444',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem'
                        }}>
                          {faq.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#e2e8f0' }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                        {faq.answer}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                      <button
                        onClick={() => toggleActive(faq)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: faq.active ? '#ef4444' : '#10b981',
                          border: 'none',
                          borderRadius: '6px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        {faq.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleEdit(faq)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#3b82f6',
                          border: 'none',
                          borderRadius: '6px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#dc2626',
                          border: 'none',
                          borderRadius: '6px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: '#1e3a5f',
              padding: '2rem',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                    Question *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a1929',
                      border: '2px solid #3d5a80',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your question"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                    Answer *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a1929',
                      border: '2px solid #3d5a80',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    placeholder="Enter the answer"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a1929',
                      border: '2px solid #3d5a80',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                    />
                    <span style={{ color: '#e2e8f0' }}>Active (visible on website)</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#3d5a80',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
