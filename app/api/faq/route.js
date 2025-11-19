import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession, getAdminEmail } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

// GET all FAQs (public)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    let query = {};
    if (activeOnly) {
      query.active = true;
    }

    const faqs = await FAQ.find(query).sort({ order: 1, created_at: -1 });

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('FAQs fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

// POST create new FAQ (requires authentication)
export async function POST(request) {
  try {
    // Verify session
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookie(cookieHeader);
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Validate required fields
    if (!data.question || !data.answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Handle order conflicts: if the order already exists, move existing FAQ to the end
    const orderValue = data.order || 1;
    const existingWithOrder = await FAQ.findOne({ order: orderValue });

    if (existingWithOrder) {
      // Find the highest order number
      const allFAQs = await FAQ.find();
      const maxOrder = allFAQs.length > 0
        ? Math.max(...allFAQs.map(f => f.order || 1))
        : 1;

      // Move the existing FAQ to the end
      await FAQ.findByIdAndUpdate(existingWithOrder._id, {
        order: maxOrder + 1,
        updated_at: new Date(),
      });
    }

    // Create new FAQ
    const faq = await FAQ.create({
      ...data,
      created_by: getAdminEmail(),
      updated_by: getAdminEmail(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error) {
    console.error('FAQ create error:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
