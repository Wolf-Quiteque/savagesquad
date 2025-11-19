import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession, getAdminEmail } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

// PUT update FAQ (requires authentication)
export async function PUT(request, { params }) {
  try {
    // Verify session
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookie(cookieHeader);
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    // Get the current FAQ being updated
    const currentFAQ = await FAQ.findById(id);
    if (!currentFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    // Handle order conflicts: if changing to an order that already exists (and it's not the current one)
    const newOrder = data.order !== undefined ? data.order : currentFAQ.order;
    const existingWithOrder = await FAQ.findOne({
      order: newOrder,
      _id: { $ne: id }
    });

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

    const faq = await FAQ.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
          updated_at: new Date(),
          updated_by: getAdminEmail(),
        }
      },
      { new: true }
    );

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error('FAQ update error:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// DELETE FAQ (requires authentication)
export async function DELETE(request, { params }) {
  try {
    // Verify session
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookie(cookieHeader);
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    console.error('FAQ delete error:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
