'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditModal({ item, onClose, onSave, saving }) {
  const [content, setContent] = useState(item.content.html || item.content.text || '');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const handleSave = () => {
    onSave({
      ...item,
      content: {
        ...item.content,
        html: content,
        text: content.replace(/<[^>]*>/g, ''), // Strip HTML for plain text
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
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Edit Text Content</h5>
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
              disabled={saving}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-white"
              style={{ minHeight: '300px' }}
            />
          </div>

          <div className="modal-footer">
            <button
              onClick={onClose}
              className="btn btn-secondary"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
