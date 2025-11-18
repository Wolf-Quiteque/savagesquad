import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  profile_image: {
    type: String,
    default: '/assets/images/slider/profational2.png',
  },
  order: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: String,
  updated_by: String,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema, 'testimonials');
