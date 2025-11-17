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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">Upload Image</h3>
            <p className="text-gray-600 mt-1">{item.metadata?.section_name || item.section_id}</p>
            {item.metadata?.page && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mt-2 inline-block">
                Page: {item.metadata.page}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={saving || uploading}
          >
            ×
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 transition ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="space-y-2">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded shadow-lg" />
              {!uploading && (
                <p className="text-sm text-gray-500">Drag & drop to replace, or click to select</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <p className="text-gray-600">Drag & drop an image here, or click to select</p>
              <p className="text-sm text-gray-400">Images will be optimized and converted to WebP</p>
            </div>
          )}
        </div>

        {uploadProgress && (
          <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-center">
            {uploadProgress}
          </div>
        )}

        {uploading && (
          <div className="mb-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Processing image...</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text (for accessibility)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the image"
            disabled={uploading || saving}
          />
          <p className="text-xs text-gray-500 mt-1">
            Helps screen readers and improves SEO
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition"
            disabled={saving || uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!preview || uploading || saving}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Image'}
          </button>
        </div>
      </div>
    </div>
  );
}
