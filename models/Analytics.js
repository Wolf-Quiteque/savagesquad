import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    index: true,
  },
  total_views: {
    type: Number,
    default: 0,
  },
  unique_visitors: {
    type: Number,
    default: 0,
  },
  visitor_ips: {
    type: [String],
    default: [],
  },
  page_views: {
    type: Map,
    of: Number,
    default: {},
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema, 'savagesquad_analytics');
