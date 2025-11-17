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
      <div className="min-h-screen bg-gray-100">
        <AdminNav />
        <div className="flex items-center justify-center py-20">
          <div className="text-xl">Loading content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Content Editor</h2>
          <p className="text-gray-600">Select content below to edit. Changes are saved immediately.</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {/* Content List */}
        <div className="grid grid-cols-1 gap-4">
          {content.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">No content available yet. Content will appear here once created.</p>
            </div>
          ) : (
            content.map((item) => (
              <div
                key={item.section_id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleEdit(item)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{item.metadata?.section_name || item.section_id}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item.content_type}
                      </span>
                      {item.metadata?.page && (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
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
                            className="h-32 object-cover rounded"
                          />
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                          Alt: {item.content.alt || 'No alt text'}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: item.content.html || item.content.text || 'No content'
                        }}
                      />
                    )}

                    {item.updated_at && (
                      <p className="text-xs text-gray-400 mt-2">
                        Last updated: {new Date(item.updated_at).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
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
