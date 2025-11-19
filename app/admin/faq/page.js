'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/app/components/admin/AdminNav';

export default function FAQManager() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 1,
    active: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faq');

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    }
    setLoading(false);
  };

  const getNextAvailableOrder = () => {
    if (faqs.length === 0) return 1;
    const maxOrder = Math.max(...faqs.map(f => f.order || 1));
    return maxOrder + 1;
  };

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        order: faq.order || 1,
        active: faq.active !== false
      });
    } else {
      setEditingFaq(null);
      const nextOrder = getNextAvailableOrder();
      setFormData({
        question: '',
        answer: '',
        order: nextOrder,
        active: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      order: 1,
      active: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setSaving(true);

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

      const data = await res.json();

      if (data.success || res.ok) {
        setSuccessMessage(
          editingFaq
            ? 'FAQ updated successfully!'
            : 'FAQ created successfully!'
        );
        handleCloseModal();
        await fetchFAQs();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(data.error || 'Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to save FAQ');
    }

    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success || res.ok) {
        setSuccessMessage('FAQ deleted successfully!');
        await fetchFAQs();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(data.error || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ');
    }
  };

  const toggleActive = async (faq) => {
    try {
      const res = await fetch(`/api/faq/${faq._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          active: !faq.active
        })
      });

      const data = await res.json();

      if (data.success || res.ok) {
        await fetchFAQs();
      } else {
        alert(data.error || 'Failed to update FAQ status');
      }
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      alert('Failed to update FAQ status');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNav />
        <div className="container py-5 text-center">
          <div className="h4">Loading FAQs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNav />

      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h2 fw-bold">Manage FAQs</h2>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary"
          >
            <i className="fa fa-plus me-2"></i>
            Add FAQ
          </button>
        </div>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage('')}
            ></button>
          </div>
        )}

        {faqs.length === 0 ? (
          <div className="admin-card text-center py-5">
            <p className="text-muted mb-3">No FAQs yet</p>
            <button
              onClick={() => handleOpenModal()}
              className="btn btn-primary"
            >
              Add Your First FAQ
            </button>
          </div>
        ) : (
          <div className="admin-card">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Order</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th style={{ width: '100px' }}>Status</th>
                    <th style={{ width: '200px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq._id}>
                      <td>
                        <span className="badge bg-secondary">{faq.order}</span>
                      </td>
                      <td>
                        <strong>{faq.question}</strong>
                      </td>
                      <td>
                        <div
                          style={{
                            maxWidth: '400px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {faq.answer}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            faq.active ? 'bg-success' : 'bg-warning text-dark'
                          }`}
                        >
                          {faq.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            onClick={() => toggleActive(faq)}
                            className={`btn ${
                              faq.active ? 'btn-outline-warning' : 'btn-outline-success'
                            }`}
                            title={faq.active ? 'Deactivate' : 'Activate'}
                          >
                            <i className={`fa ${faq.active ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                          </button>
                          <button
                            onClick={() => handleOpenModal(faq)}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
                            className="btn btn-outline-danger"
                            title="Delete"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Question *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.question}
                      onChange={(e) =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      required
                      placeholder="Enter the question"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Answer *</label>
                    <textarea
                      className="form-control"
                      value={formData.answer}
                      onChange={(e) =>
                        setFormData({ ...formData, answer: e.target.value })
                      }
                      required
                      rows={5}
                      placeholder="Enter the answer"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Display Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            order: parseInt(e.target.value) || 1
                          })
                        }
                        min="1"
                      />
                      <small className="text-muted">
                        Lower numbers appear first
                      </small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.active}
                          onChange={(e) =>
                            setFormData({ ...formData, active: e.target.checked })
                          }
                          id="activeSwitch"
                        />
                        <label className="form-check-label" htmlFor="activeSwitch">
                          {formData.active ? 'Active (visible on website)' : 'Inactive (hidden)'}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>{editingFaq ? 'Update FAQ' : 'Create FAQ'}</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
