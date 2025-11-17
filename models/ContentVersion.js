import mongoose from 'mongoose';

const ContentVersionSchema = new mongoose.Schema({
  section_id: {
    type: String,
    required: true,
    index: true,
  },
  version: {
    type: Number,
    required: true,
  },
  content_type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'link', 'rich_text'],
  },
  content: {
    text: String,
    html: String,
    url: String,
    alt: String,
    href: String,
    target: String,
  },
  metadata: {
    section_name: String,
    page: String,
    order: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: String,
  change_description: String,
});

// Compound index for efficient version queries
ContentVersionSchema.index({ section_id: 1, version: -1 });

export default mongoose.models.ContentVersion || mongoose.model('ContentVersion', ContentVersionSchema, 'savagesquad_content_versions');
