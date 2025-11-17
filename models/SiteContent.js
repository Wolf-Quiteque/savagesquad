import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  section_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  updated_at: {
    type: Date,
    default: Date.now,
  },
  updated_by: String,
});

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema, 'savagesquad_site_content');
