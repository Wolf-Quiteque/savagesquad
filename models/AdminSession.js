import mongoose from 'mongoose';

const AdminSessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: true,
    index: true,
  },
  last_activity: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AdminSession || mongoose.model('AdminSession', AdminSessionSchema, 'savagesquad_admin_sessions');
