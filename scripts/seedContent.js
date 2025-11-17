/**
 * Content Seeding Script
 *
 * This script populates the database with initial content from your existing site.
 * Run this once to migrate your current static content to the CMS.
 *
 * Usage: node scripts/seedContent.js
 */

import mongoose from 'mongoose';
import SiteContent from '../models/SiteContent.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

// Your existing site content - add all your current content here
const seedData = [
  // Hero Section - Home Page
  {
    section_id: 'hero_title',
    content_type: 'rich_text',
    content: {
      text: 'Welcome to Savage Squad',
      html: '<h1>Welcome to Savage Squad</h1>',
    },
    metadata: {
      section_name: 'Hero Title',
      page: 'home',
      order: 1,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_subtitle',
    content_type: 'rich_text',
    content: {
      text: 'Surety Bond Certified Credit Services & Analysis',
      html: '<p>Surety Bond Certified Credit Services & Analysis</p>',
    },
    metadata: {
      section_name: 'Hero Subtitle',
      page: 'home',
      order: 2,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_description',
    content_type: 'rich_text',
    content: {
      text: 'Empower your credit journey with professional, surety bond certified credit services. Get free consultation, expert analysis, and personalized solutions to improve your credit health.',
      html: '<p>Empower your credit journey with professional, surety bond certified credit services. Get free consultation, expert analysis, and personalized solutions to improve your credit health.</p>',
    },
    metadata: {
      section_name: 'Hero Description',
      page: 'home',
      order: 3,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_image',
    content_type: 'image',
    content: {
      url: '/assets/images/hero.jpg',
      alt: 'Savage Squad Credit Services - Professional Credit Analysis',
    },
    metadata: {
      section_name: 'Hero Image',
      page: 'home',
      order: 4,
    },
    updated_by: 'system',
  },

  // About Section
  {
    section_id: 'about_title',
    content_type: 'rich_text',
    content: {
      text: 'About Savage Squad',
      html: '<h2>About Savage Squad</h2>',
    },
    metadata: {
      section_name: 'About Title',
      page: 'home',
      order: 10,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_description',
    content_type: 'rich_text',
    content: {
      text: 'Professional surety bond certified credit services provider dedicated to helping you achieve your financial goals.',
      html: '<p>Professional surety bond certified credit services provider dedicated to helping you achieve your financial goals.</p>',
    },
    metadata: {
      section_name: 'About Description',
      page: 'home',
      order: 11,
    },
    updated_by: 'system',
  },

  // Services Section
  {
    section_id: 'services_title',
    content_type: 'rich_text',
    content: {
      text: 'Our Services',
      html: '<h2>Our Services</h2>',
    },
    metadata: {
      section_name: 'Services Title',
      page: 'home',
      order: 20,
    },
    updated_by: 'system',
  },

  // Contact Section
  {
    section_id: 'contact_title',
    content_type: 'rich_text',
    content: {
      text: 'Get in Touch',
      html: '<h2>Get in Touch</h2>',
    },
    metadata: {
      section_name: 'Contact Title',
      page: 'home',
      order: 30,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_phone',
    content_type: 'text',
    content: {
      text: '+1-866-753-4963',
    },
    metadata: {
      section_name: 'Contact Phone',
      page: 'home',
      order: 31,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_email',
    content_type: 'text',
    content: {
      text: 'Credit@savagesquad.com',
    },
    metadata: {
      section_name: 'Contact Email',
      page: 'home',
      order: 32,
    },
    updated_by: 'system',
  },

  // Add more sections as needed...
  // Copy content from your existing page.js and add it here
];

async function seedContent() {
  try {
    console.log('🌱 Starting content seeding...');
    console.log('📡 Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Display which collection will be used
    const collectionName = SiteContent.collection.name;
    console.log(`📝 Using collection: ${collectionName}`);

    console.log(`📦 Seeding ${seedData.length} content items...`);

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const item of seedData) {
      const existing = await SiteContent.findOne({ section_id: item.section_id });

      if (existing) {
        console.log(`⏭️  Skipped: ${item.section_id} (already exists)`);
        skipped++;
      } else {
        await SiteContent.create(item);
        console.log(`✨ Created: ${item.section_id}`);
        created++;
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Created: ${created}`);
    console.log(`   📝 Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${seedData.length}`);
    console.log('\n🎉 Content seeding completed successfully!');

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedContent();
