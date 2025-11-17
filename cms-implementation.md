# CMS Implementation Guide for Savage Squad Website

## Overview
This document provides a comprehensive guide to building a no-code friendly CMS system that allows non-technical users to edit all website content through a visual interface. The system includes analytics tracking and uses MongoDB for data storage and Cloudflare R2 for image storage.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Detailed Implementation Steps](#detailed-implementation-steps)
6. [Testing & Deployment](#testing--deployment)

---

## System Architecture

### High-Level Components
```
┌─────────────────────────────────────────────────────────┐
│                   Admin Dashboard                        │
│  ┌────────────────┐  ┌────────────────────────────┐    │
│  │   Analytics    │  │    Content Editor          │    │
│  │   Dashboard    │  │    (Visual WYSIWYG)        │    │
│  └────────────────┘  └────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │        Next.js API Routes          │
         └────────────────────────────────────┘
                          │
         ┌────────────────┴──────────────────┐
         ▼                                    ▼
┌─────────────────┐              ┌─────────────────────┐
│    MongoDB      │              │   Cloudflare R2     │
│  (Content &     │              │  (Image Storage)    │
│   Analytics)    │              │                     │
└─────────────────┘              └─────────────────────┘
```

---

## Technology Stack

### Frontend
- **Next.js 14+** (App Router)
- **React 18+**
- **TailwindCSS** (already in use)
- **Rich Text Editor**: Quill.js or TipTap (for no-code text editing)
- **Image Upload**: react-dropzone
- **Image Optimization**: sharp (server-side) or browser-image-compression (client-side)

### Backend
- **Next.js API Routes** (serverless functions)
- **MongoDB** with Mongoose ODM
- **Cloudflare R2** SDK (@aws-sdk/client-s3 with R2 endpoints)

### Authentication
- **NextAuth.js** for admin authentication
- Session-based authentication with secure cookies

### Analytics Tracking
- Custom lightweight analytics (privacy-friendly)
- IP-based visitor tracking with daily aggregation

---

## Database Schema

### MongoDB Collections

#### 1. `site_content` Collection
Stores all editable content from the website.

```javascript
{
  _id: ObjectId,
  section_id: String,        // e.g., "hero_title", "about_description"
  content_type: String,      // "text", "image", "link"
  content: {
    text: String,            // For text content
    html: String,            // For rich text (formatted HTML)
    url: String,             // For images (R2 URL) or links
    alt: String,             // For image alt text
    href: String,            // For link destinations
    target: String           // For link target (_blank, _self)
  },
  metadata: {
    section_name: String,    // Human-readable name
    page: String,            // Page identifier (e.g., "home", "about")
    order: Number            // Display order if multiple items
  },
  updated_at: Date,
  updated_by: String         // Admin user ID/email
}
```

**Indexes:**
```javascript
db.site_content.createIndex({ section_id: 1 }, { unique: true })
db.site_content.createIndex({ "metadata.page": 1 })
```

#### 2. `analytics` Collection
Tracks site visits and views with simple counters.

```javascript
{
  _id: ObjectId,
  date: Date,                // Date of the record (YYYY-MM-DD)
  total_views: Number,       // Total page views for the day
  unique_visitors: Number,   // Unique visitors for the day
  visitor_ips: [String],     // Array of hashed IPs (for deduplication)
  page_views: {
    home: Number,
    about: Number,
    contact: Number,
    // ... other pages
  },
  updated_at: Date
}
```

**Indexes:**
```javascript
db.analytics.createIndex({ date: -1 }, { unique: true })
```

#### 3. `admin_users` Collection
Stores admin user credentials.

```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,     // bcrypt hashed password
  name: String,
  role: String,              // "admin", "editor"
  created_at: Date,
  last_login: Date
}
```

**Indexes:**
```javascript
db.admin_users.createIndex({ email: 1 }, { unique: true })
```

---

## Implementation Roadmap

### Progress Tracker

#### Phase 1: Foundation Setup
- [ ] 1.1 Install required dependencies
- [ ] 1.2 Set up MongoDB connection
- [ ] 1.3 Configure Cloudflare R2 credentials
- [ ] 1.4 Create environment variables
- [ ] 1.5 Set up database models (Mongoose schemas)

#### Phase 2: Authentication System
- [ ] 2.1 Install and configure NextAuth.js
- [ ] 2.2 Create admin login page (`/admin/login`)
- [ ] 2.3 Implement authentication API routes
- [ ] 2.4 Add middleware for protected routes
- [ ] 2.5 Create initial admin user seeder script

#### Phase 3: Analytics System
- [ ] 3.1 Create analytics tracking middleware
- [ ] 3.2 Implement visitor IP hashing (privacy)
- [ ] 3.3 Build analytics API endpoints
- [ ] 3.4 Create daily aggregation cron job/function
- [ ] 3.5 Design analytics dashboard UI
- [ ] 3.6 Implement analytics charts (Chart.js or Recharts)

#### Phase 4: Content Management Backend
- [ ] 4.1 Create content API routes (GET, POST, PUT)
- [ ] 4.2 Implement content versioning logic
- [ ] 4.3 Build image upload endpoint
- [ ] 4.4 Add image optimization pipeline (WebP conversion)
- [ ] 4.5 Connect to Cloudflare R2 for image storage
- [ ] 4.6 Create content seeding script (populate from existing page.js)

#### Phase 5: Admin Dashboard UI
- [ ] 5.1 Create admin dashboard layout (`/admin`)
- [ ] 5.2 Build analytics overview section
- [ ] 5.3 Add date range filters for analytics
- [ ] 5.4 Implement real-time stats display
- [ ] 5.5 Create navigation between analytics and editor

#### Phase 6: Visual Content Editor
- [ ] 6.1 Create editor page (`/admin/editor`)
- [ ] 6.2 Implement iframe preview of live site
- [ ] 6.3 Build content overlay system (edit buttons)
- [ ] 6.4 Add pencil icons for text elements
- [ ] 6.5 Add camera icons for image elements
- [ ] 6.6 Create text edit modal with rich text editor
- [ ] 6.7 Create image upload modal with preview
- [ ] 6.8 Implement link editing functionality
- [ ] 6.9 Add save/publish workflow
- [ ] 6.10 Implement real-time preview updates

#### Phase 7: Frontend Integration
- [ ] 7.1 Refactor page.js to fetch content from API
- [ ] 7.2 Create content loading component
- [ ] 7.3 Implement fallback to default content
- [ ] 7.4 Add SSR support for SEO
- [ ] 7.5 Optimize image loading (Next.js Image component)

#### Phase 8: Rich Text Editor Setup
- [ ] 8.1 Integrate TipTap/Quill editor
- [ ] 8.2 Configure toolbar (bold, italic, underline, font size)
- [ ] 8.3 Add color picker for text
- [ ] 8.4 Implement alignment options
- [ ] 8.5 Add list formatting (bullets, numbers)
- [ ] 8.6 Create editor styles matching site theme

#### Phase 9: Image Optimization Pipeline
- [ ] 9.1 Install sharp or browser-image-compression
- [ ] 9.2 Create image compression function (quality: 80-85%)
- [ ] 9.3 Implement WebP conversion
- [ ] 9.4 Add image resizing (multiple sizes for responsive)
- [ ] 9.5 Generate thumbnails for admin preview
- [ ] 9.6 Test file size reduction (target: 50-70% reduction)

#### Phase 10: Testing & Quality Assurance
- [ ] 10.1 Test all CRUD operations
- [ ] 10.2 Verify analytics tracking accuracy
- [ ] 10.3 Test image upload and optimization
- [ ] 10.4 Check mobile responsiveness of editor
- [ ] 10.5 Validate rich text editor output
- [ ] 10.6 Test authentication flow (login/logout)
- [ ] 10.7 Verify R2 storage and retrieval
- [ ] 10.8 Cross-browser testing
- [ ] 10.9 Performance testing (Lighthouse)
- [ ] 10.10 Security audit (API routes)

#### Phase 11: Documentation & Training
- [ ] 11.1 Create admin user guide (with screenshots)
- [ ] 11.2 Document API endpoints
- [ ] 11.3 Write content editing best practices
- [ ] 11.4 Create video tutorial for editors
- [ ] 11.5 Document deployment process

#### Phase 12: Deployment
- [ ] 12.1 Set up production MongoDB database
- [ ] 12.2 Configure Cloudflare R2 bucket
- [ ] 12.3 Set environment variables in production
- [ ] 12.4 Deploy to Vercel/hosting platform
- [ ] 12.5 Run database migrations/seeders
- [ ] 12.6 Test production environment
- [ ] 12.7 Set up monitoring and alerts

---

## Detailed Implementation Steps

### Phase 1: Foundation Setup

#### 1.1 Install Required Dependencies

```bash
npm install mongodb mongoose
npm install @aws-sdk/client-s3
npm install next-auth bcryptjs
npm install react-quill quill
npm install sharp
npm install date-fns
npm install react-dropzone
npm install recharts
npm install crypto-js
```

#### 1.2 Create Environment Variables

Create `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/savage-squad?retryWrites=true&w=majority

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=savage-squad-images
R2_PUBLIC_URL=https://your-r2-domain.com

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_secret_here

# Admin
ADMIN_EMAIL=admin@savagesquad.com
ADMIN_PASSWORD=change_this_password
```

#### 1.3 Set Up MongoDB Connection

Create `lib/mongodb.js`:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

#### 1.4 Create Mongoose Models

Create `models/SiteContent.js`:

```javascript
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

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
```

Create `models/Analytics.js`:

```javascript
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

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
```

Create `models/AdminUser.js`:

```javascript
import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  name: String,
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_login: Date,
});

export default mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
```

---

### Phase 2: Authentication System

#### 2.1 Configure NextAuth

Create `app/api/auth/[...nextauth]/route.js`:

```javascript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();

        const user = await AdminUser.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password_hash);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Update last login
        user.last_login = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

#### 2.2 Create Admin Login Page

Create `app/admin/login/page.js`:

```javascript
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
```

#### 2.3 Create Admin Seeder Script

Create `scripts/seed-admin.js`:

```javascript
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const AdminUserSchema = new mongoose.Schema({
  email: String,
  password_hash: String,
  name: String,
  role: String,
  created_at: Date,
});

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    const admin = await AdminUser.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL || 'admin@savagesquad.com' },
      {
        email: process.env.ADMIN_EMAIL || 'admin@savagesquad.com',
        password_hash: hashedPassword,
        name: 'Admin',
        role: 'admin',
        created_at: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user created:', admin.email);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
```

Add to `package.json`:

```json
{
  "scripts": {
    "seed:admin": "node scripts/seed-admin.js"
  }
}
```

---

### Phase 3: Analytics System

#### 3.1 Create Analytics Tracking API

Create `app/api/analytics/track/route.js`:

```javascript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import crypto from 'crypto';

export async function POST(request) {
  try {
    await connectDB();

    const { page } = await request.json();
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Hash IP for privacy
    const hashedIp = crypto.createHash('sha256').update(ip).digest('hex');

    // Get today's date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's analytics record
    let analytics = await Analytics.findOne({ date: today });

    if (!analytics) {
      analytics = new Analytics({
        date: today,
        total_views: 0,
        unique_visitors: 0,
        visitor_ips: [],
        page_views: {},
      });
    }

    // Increment total views
    analytics.total_views += 1;

    // Check if this is a unique visitor
    if (!analytics.visitor_ips.includes(hashedIp)) {
      analytics.visitor_ips.push(hashedIp);
      analytics.unique_visitors += 1;
    }

    // Increment page views
    const currentPageViews = analytics.page_views.get(page) || 0;
    analytics.page_views.set(page, currentPageViews + 1);

    analytics.updated_at = new Date();

    await analytics.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
```

#### 3.2 Create Analytics Dashboard API

Create `app/api/analytics/dashboard/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const analytics = await Analytics.find({
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // Calculate totals
    const totals = analytics.reduce((acc, day) => {
      acc.total_views += day.total_views;
      acc.unique_visitors += day.unique_visitors;
      return acc;
    }, { total_views: 0, unique_visitors: 0 });

    return NextResponse.json({
      totals,
      daily: analytics,
      period_days: days,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

#### 3.3 Add Analytics Tracking to Frontend

Create `components/AnalyticsTracker.js`:

```javascript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname === '/' ? 'home' : pathname.replace('/', '')
          }),
        });
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
```

Add to `app/layout.js`:

```javascript
import AnalyticsTracker from '@/components/AnalyticsTracker';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
```

---

### Phase 4: Content Management Backend

#### 4.1 Create Content API Routes

Create `app/api/content/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';

// GET all content
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const query = page ? { 'metadata.page': page } : {};
    const content = await SiteContent.find(query).sort({ 'metadata.order': 1 });

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

// POST/UPDATE content
export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    const content = await SiteContent.findOneAndUpdate(
      { section_id: data.section_id },
      {
        ...data,
        updated_at: new Date(),
        updated_by: session.user.email,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
```

#### 4.2 Create Image Upload API with R2

Create `lib/r2.js`:

```javascript
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToR2(file, fileName) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: 'image/webp',
  });

  await r2Client.send(command);

  return `${process.env.R2_PUBLIC_URL}/${fileName}`;
}

export async function deleteFromR2(fileName) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
  });

  await r2Client.send(command);
}

export { r2Client };
```

Create `app/api/upload/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import sharp from 'sharp';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Optimize image with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(2000, 2000, { // Max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 }) // Convert to WebP with 85% quality
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `uploads/${timestamp}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;

    // Upload to R2
    const url = await uploadToR2(optimizedBuffer, fileName);

    return NextResponse.json({
      url,
      fileName,
      size: optimizedBuffer.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

---

### Phase 5: Admin Dashboard UI

#### 5.1 Create Admin Dashboard Layout

Create `app/admin/layout.js`:

```javascript
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Savage Squad CMS</h1>
          <div className="flex gap-4">
            <a href="/admin" className="text-blue-600 hover:underline">Dashboard</a>
            <a href="/admin/editor" className="text-blue-600 hover:underline">Editor</a>
            <button onClick={() => signOut()} className="text-red-600 hover:underline">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
```

#### 5.2 Create Analytics Dashboard

Create `app/admin/page.js`:

```javascript
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/dashboard?days=${days}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Analytics Dashboard</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setDays(7)}
            className={`px-4 py-2 rounded ${days === 7 ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDays(30)}
            className={`px-4 py-2 rounded ${days === 30 ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            30 Days
          </button>
          <button
            onClick={() => setDays(90)}
            className={`px-4 py-2 rounded ${days === 90 ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Views</h3>
          <p className="text-4xl font-bold">{analytics?.totals?.total_views || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Unique Visitors</h3>
          <p className="text-4xl font-bold">{analytics?.totals?.unique_visitors || 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Daily Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics?.daily || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_views" stroke="#8884d8" name="Total Views" />
            <Line type="monotone" dataKey="unique_visitors" stroke="#82ca9d" name="Unique Visitors" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/admin/editor"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Content Editor →
        </a>
      </div>
    </div>
  );
}
```

---

### Phase 6: Visual Content Editor

#### 6.1 Create Editor Page Structure

Create `app/admin/editor/page.js`:

```javascript
'use client';

import { useState, useEffect } from 'react';
import EditModal from '@/components/admin/EditModal';
import ImageUploadModal from '@/components/admin/ImageUploadModal';

export default function ContentEditor() {
  const [content, setContent] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch('/api/content');
    const data = await res.json();
    setContent(data.content);
  };

  const handleSave = async (updatedContent) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });
      fetchContent();
      setEditingItem(null);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Editor</h2>
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showOverlay ? 'Hide' : 'Show'} Edit Buttons
        </button>
      </div>

      {/* Preview Frame */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          src="/"
          className="w-full"
          style={{ height: '80vh' }}
          onLoad={(e) => {
            if (showOverlay) {
              injectEditButtons(e.target);
            }
          }}
        />
      </div>

      {/* Modals */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}

      {uploadingImage && (
        <ImageUploadModal
          item={uploadingImage}
          onClose={() => setUploadingImage(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function injectEditButtons(iframe) {
  // This function would inject edit buttons next to editable elements
  // Implementation would involve DOM manipulation within the iframe
}
```

#### 6.2 Create Text Edit Modal

Create `components/admin/EditModal.js`:

```javascript
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditModal({ item, onClose, onSave }) {
  const [content, setContent] = useState(item.content.html || item.content.text || '');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Text Content</h3>
        <p className="text-gray-600 mb-4">{item.metadata?.section_name}</p>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          className="mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### 6.3 Create Image Upload Modal

Create `components/admin/ImageUploadModal.js`:

```javascript
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadModal({ item, onClose, onSave }) {
  const [preview, setPreview] = useState(item.content.url || '');
  const [alt, setAlt] = useState(item.content.alt || '');
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);

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
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setPreview(data.url);
      setUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1
  });

  const handleSave = () => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4">Upload Image</h3>
        <p className="text-gray-600 mb-4">{item.metadata?.section_name}</p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
          ) : (
            <div>
              <p className="text-gray-600">Drag & drop an image here, or click to select</p>
              <p className="text-sm text-gray-400 mt-2">Image will be optimized and converted to WebP</p>
            </div>
          )}
        </div>

        {uploading && <p className="text-center mb-4">Uploading and optimizing...</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Alt Text (for accessibility)</label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Describe the image"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!preview || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Phase 7: Frontend Integration

#### 7.1 Create Content Loading Hook

Create `hooks/useContent.js`:

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function useContent(sectionId, defaultContent) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?section_id=${sectionId}`);
      const data = await res.json();

      if (data.content && data.content.length > 0) {
        setContent(data.content[0]);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  return { content, loading };
}
```

#### 7.2 Create Editable Components

Create `components/EditableText.js`:

```javascript
'use client';

import useContent from '@/hooks/useContent';

export default function EditableText({ sectionId, defaultText, className, tag: Tag = 'p' }) {
  const { content, loading } = useContent(sectionId, { content: { text: defaultText } });

  if (loading) {
    return <Tag className={className}>{defaultText}</Tag>;
  }

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: content.content?.html || content.content?.text || defaultText }}
    />
  );
}
```

Create `components/EditableImage.js`:

```javascript
'use client';

import useContent from '@/hooks/useContent';

export default function EditableImage({ sectionId, defaultSrc, alt, className, ...props }) {
  const { content, loading } = useContent(sectionId, { content: { url: defaultSrc, alt } });

  const src = content.content?.url || defaultSrc;
  const altText = content.content?.alt || alt;

  return (
    <img
      src={src}
      alt={altText}
      className={className}
      {...props}
    />
  );
}
```

---

## Testing & Deployment

### Testing Checklist

#### Unit Testing
- [ ] Test MongoDB connection
- [ ] Test content CRUD operations
- [ ] Test analytics tracking accuracy
- [ ] Test image upload and optimization
- [ ] Test authentication flow

#### Integration Testing
- [ ] Test admin login and session management
- [ ] Test content updates reflecting on frontend
- [ ] Test analytics dashboard data accuracy
- [ ] Test R2 image storage and retrieval

#### UI/UX Testing
- [ ] Test rich text editor functionality
- [ ] Test image upload modal
- [ ] Test responsive design on mobile
- [ ] Test edit button overlay system
- [ ] Test all interactive elements

#### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Image optimization reducing file size by 50%+
- [ ] Page load time < 3 seconds
- [ ] Database query optimization

#### Security Testing
- [ ] Test authentication bypass attempts
- [ ] Test SQL injection prevention
- [ ] Test XSS vulnerability protection
- [ ] Test file upload security
- [ ] Test API rate limiting

### Deployment Steps

1. **Prepare Production Environment**
   ```bash
   # Set environment variables in hosting platform
   MONGODB_URI=production_mongodb_uri
   R2_ACCOUNT_ID=production_r2_account
   R2_ACCESS_KEY_ID=production_key
   R2_SECRET_ACCESS_KEY=production_secret
   NEXTAUTH_SECRET=random_production_secret
   ```

2. **Database Migration**
   ```bash
   npm run seed:admin
   # Run any other migration scripts
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel** (or other platform)
   ```bash
   vercel --prod
   ```

5. **Post-Deployment Verification**
   - Test admin login
   - Test content editing
   - Test analytics tracking
   - Test image uploads

---

## Best Practices for Content Editors

### Text Editing
1. **Use Headers Wisely**: Use H1 for main titles, H2 for sections, H3 for subsections
2. **Keep It Simple**: Avoid excessive formatting
3. **Check Mobile**: Always preview on mobile devices
4. **Accessibility**: Use proper heading hierarchy

### Image Management
1. **Optimize Before Upload**: System will compress, but smaller originals = better results
2. **Use Alt Text**: Always describe images for accessibility
3. **Appropriate Sizes**: Don't upload 10MB images for small icons
4. **Consistent Style**: Maintain visual consistency across site

### Link Management
1. **Test Links**: Always verify links work after editing
2. **External Links**: Use target="_blank" for external sites
3. **Descriptive Text**: Use meaningful anchor text

---

## Maintenance & Support

### Regular Tasks
- [ ] Monitor analytics for unusual traffic patterns
- [ ] Review R2 storage usage monthly
- [ ] Backup MongoDB database weekly
- [ ] Update dependencies quarterly
- [ ] Review and clear old analytics data (optional)

### Troubleshooting

#### Content Not Updating
1. Check browser cache (hard refresh: Ctrl+Shift+R)
2. Verify API route is saving correctly
3. Check database connection

#### Images Not Loading
1. Verify R2 bucket permissions
2. Check R2 public URL configuration
3. Verify image was uploaded successfully

#### Analytics Not Tracking
1. Check if AnalyticsTracker component is loaded
2. Verify API route is accessible
3. Check MongoDB connection

---

## Future Enhancements

### Phase 13: Additional Features (Optional)
- [ ] Content version history and rollback
- [ ] Multi-language support
- [ ] A/B testing for content variations
- [ ] SEO metadata editor
- [ ] Scheduled content publishing
- [ ] User roles and permissions (multiple editors)
- [ ] Export analytics to CSV
- [ ] Content templates library
- [ ] Bulk image optimization tool
- [ ] Custom domain for R2 images

---

## Resources & References

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Quill](https://github.com/zenoamaro/react-quill)

### Helpful Commands
```bash
# Development
npm run dev

# Create admin user
npm run seed:admin

# Build for production
npm run build

# Start production server
npm start
```

---

## Contact & Support

For technical support or questions about this CMS implementation:
- Email: dev@savagesquad.com
- Documentation: [Internal Wiki Link]

---

**Last Updated**: 2025
**Version**: 1.0.0
