'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/app/components/admin/AdminNav';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    text: '',
    stars: 5,
    profile_image: '/assets/images/slider/profational2.png',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
    setLoading(false);
  };

  const getNextAvailableOrder = () => {
    if (testimonials.length === 0) return 1;
    const maxOrder = Math.max(...testimonials.map(t => t.order || 0));
    return maxOrder + 1;
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        occupation: testimonial.occupation,
        text: testimonial.text,
        stars: testimonial.stars,
        profile_image: testimonial.profile_image,
        order: testimonial.order || 0,
        is_active: testimonial.is_active,
      });
    } else {
      setEditingTestimonial(null);
      const nextOrder = getNextAvailableOrder();
      setFormData({
        name: '',
        occupation: '',
        text: '',
        stars: 5,
        profile_image: '/assets/images/slider/profational2.png',
        order: nextOrder,
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      occupation: '',
      text: '',
      stars: 5,
      profile_image: '/assets/images/slider/profational2.png',
      order: 0,
      is_active: true,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, profile_image: data.url });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    try {
      const url = '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const body = editingTestimonial
        ? { ...formData, id: editingTestimonial._id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(
          editingTestimonial
            ? 'Testimonial updated successfully!'
            : 'Testimonial created successfully!'
        );
        handleCloseModal();
        fetchTestimonials();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(data.error || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      alert('Failed to save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage('Testimonial deleted successfully!');
        fetchTestimonials();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(data.error || 'Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < count ? 'text-warning' : 'text-muted'}`}
      ></i>
    ));
  };

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNav />
        <div className="container py-5 text-center">
          <div className="h4">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNav />

      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h2 fw-bold">Manage Testimonials</h2>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary"
          >
            <i className="fa fa-plus me-2"></i>
            Add Testimonial
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

        {testimonials.length === 0 ? (
          <div className="admin-card text-center py-5">
            <p className="text-muted mb-3">No testimonials yet</p>
            <button
              onClick={() => handleOpenModal()}
              className="btn btn-primary"
            >
              Add Your First Testimonial
            </button>
          </div>
        ) : (
          <div className="admin-card">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Image</th>
                    <th>Name</th>
                    <th>Occupation</th>
                    <th>Testimonial</th>
                    <th style={{ width: '120px' }}>Rating</th>
                    <th style={{ width: '80px' }}>Order</th>
                    <th style={{ width: '80px' }}>Status</th>
                    <th style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id}>
                      <td>
                        <img
                          src={testimonial.profile_image}
                          alt={testimonial.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                          }}
                        />
                      </td>
                      <td className="fw-semibold">{testimonial.name}</td>
                      <td>{testimonial.occupation}</td>
                      <td>
                        <div
                          style={{
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={testimonial.text}
                        >
                          {testimonial.text}
                        </div>
                      </td>
                      <td>{renderStars(testimonial.stars)}</td>
                      <td>{testimonial.order}</td>
                      <td>
                        <span
                          className={`badge ${
                            testimonial.is_active ? 'bg-success' : 'bg-secondary'
                          }`}
                        >
                          {testimonial.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleOpenModal(testimonial)}
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    {/* Profile Image */}
                    <div className="col-12 text-center">
                      <img
                        src={formData.profile_image}
                        alt="Profile"
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          marginBottom: '15px',
                        }}
                      />
                      <div>
                        <label className="btn btn-sm btn-outline-primary">
                          {uploading ? 'Uploading...' : 'Upload Image'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Occupation */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Occupation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({ ...formData, occupation: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Testimonial Text */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Testimonial Text <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={formData.text}
                        onChange={(e) =>
                          setFormData({ ...formData, text: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>

                    {/* Stars */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Rating <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={formData.stars}
                        onChange={(e) =>
                          setFormData({ ...formData, stars: parseInt(e.target.value) })
                        }
                        required
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>

                    {/* Order */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Display Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                        }
                      />
                      <small className="text-muted">
                        Lower numbers appear first. {!editingTestimonial && 'Auto-suggested: next available order.'}
                        {' '}If order exists, it will be replaced.
                      </small>
                    </div>

                    {/* Active Status */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Status</label>
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="activeSwitch"
                          checked={formData.is_active}
                          onChange={(e) =>
                            setFormData({ ...formData, is_active: e.target.checked })
                          }
                        />
                        <label className="form-check-label" htmlFor="activeSwitch">
                          {formData.is_active ? 'Active' : 'Inactive'}
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
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
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
