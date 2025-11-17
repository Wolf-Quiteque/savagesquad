'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/app/components/admin/AdminNav';
import EditModal from '@/app/components/admin/EditModal';
import ImageUploadModal from '@/app/components/admin/ImageUploadModal';

export default function ContentEditor() {
  const [content, setContent] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setContent(data.content || []);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
    setLoading(false);
  };

  const handleSave = async (updatedContent) => {
    setSaving(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });

      if (res.ok) {
        await fetchContent();
        setEditingItem(null);
        setUploadingImage(null);
        setSuccessMessage('Content saved successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save content');
    }

    setSaving(false);
  };

  const handleEdit = (item) => {
    if (item.content_type === 'text' || item.content_type === 'rich_text') {
      setEditingItem(item);
    } else if (item.content_type === 'image') {
      setUploadingImage(item);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNav />
        <div className="d-flex align-items-center justify-content-center py-5">
          <div className="h4">Loading content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNav />

      <main className="container py-4">
        <div className="mb-4">
          <h2 className="h2 fw-bold mb-2">Content Editor</h2>
          <p className="text-muted">Select content below to edit. Changes are saved immediately.</p>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {/* Content List */}
        <div className="row g-3">
          {content.length === 0 ? (
            <div className="col-12">
              <div className="admin-card text-center">
                <p className="text-muted">No content available yet. Content will appear here once created.</p>
              </div>
            </div>
          ) : (
            content.map((item) => (
              <div key={item.section_id} className="col-12">
                <div
                  className="admin-card cursor-pointer"
                  style={{cursor: 'pointer', transition: 'box-shadow 0.2s'}}
                  onClick={() => handleEdit(item)}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                        <h3 className="h5 fw-bold mb-0">{item.metadata?.section_name || item.section_id}</h3>
                        <span className="badge bg-primary">
                          {item.content_type}
                        </span>
                        {item.metadata?.page && (
                          <span className="badge bg-secondary">
                            {item.metadata.page}
                          </span>
                        )}
                      </div>

                      {item.content_type === 'image' ? (
                        <div className="mt-2">
                          {item.content.url && (
                            <img
                              src={item.content.url}
                              alt={item.content.alt || 'Content image'}
                              style={{height: '128px', objectFit: 'cover', borderRadius: '4px'}}
                            />
                          )}
                          <p className="small text-muted mt-2">
                            Alt: {item.content.alt || 'No alt text'}
                          </p>
                        </div>
                      ) : (
                        <div
                          className="text-truncate"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: item.content.html || item.content.text || 'No content'
                          }}
                        />
                      )}

                      {item.updated_at && (
                        <p className="small text-muted mt-2 mb-0">
                          Last updated: {new Date(item.updated_at).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="btn btn-primary ms-3"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {uploadingImage && (
        <ImageUploadModal
          item={uploadingImage}
          onClose={() => setUploadingImage(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
