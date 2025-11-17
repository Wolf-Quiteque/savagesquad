'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadModal({ item, onClose, onSave, saving }) {
  const [preview, setPreview] = useState(item.content.url || '');
  const [alt, setAlt] = useState(item.content.alt || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress('Preparing image...');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress('Optimizing and uploading...');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setPreview(data.url);
        setUploadProgress(`Optimized! Saved ${data.compressionRatio} in file size`);

        // Clear progress message after 3 seconds
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
        setUploadProgress('');
      }

      setUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
      setUploading(false);
      setUploadProgress('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const handleSave = () => {
    if (!preview) {
      alert('Please upload an image first');
      return;
    }

    onSave({
      ...item,
      content: {
        ...item.content,
        url: preview,
        alt: alt,
      },
    });
  };

  return (
    <div
      className="modal d-block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1050,
        overflowY: 'auto',
        padding: '1rem'
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Upload Image</h5>
              <p className="text-muted small mb-0">{item.metadata?.section_name || item.section_id}</p>
              {item.metadata?.page && (
                <span className="badge bg-secondary mt-2">
                  Page: {item.metadata.page}
                </span>
              )}
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={saving || uploading}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div
              {...getRootProps()}
              className={`border border-2 border-dashed rounded p-4 text-center mb-3 ${
                isDragActive ? 'border-primary bg-light' : 'border-secondary'
              } ${uploading ? 'opacity-50' : ''}`}
              style={{cursor: uploading ? 'not-allowed' : 'pointer'}}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" className="img-fluid rounded shadow" style={{maxHeight: '256px'}} />
                  {!uploading && (
                    <p className="text-muted small mt-2">Drag & drop to replace, or click to select</p>
                  )}
                </div>
              ) : (
                <div className="py-4">
                  <svg
                    className="mx-auto text-secondary mb-3"
                    style={{width: '48px', height: '48px'}}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mb-1">Drag & drop an image here, or click to select</p>
                  <p className="text-muted small">Images will be optimized and converted to WebP</p>
                </div>
              )}
            </div>

            {uploadProgress && (
              <div className="alert alert-info text-center" role="alert">
                {uploadProgress}
              </div>
            )}

            {uploading && (
              <div className="text-center mb-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted small mt-2">Processing image...</p>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Alt Text (for accessibility)</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="form-control"
                placeholder="Describe the image"
                disabled={uploading || saving}
              />
              <div className="form-text">
                Helps screen readers and improves SEO
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={onClose}
              className="btn btn-secondary"
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!preview || uploading || saving}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : 'Save Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
