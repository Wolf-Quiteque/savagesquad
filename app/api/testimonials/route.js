import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession, getAdminEmail } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

// GET all testimonials (public)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    let query = {};
    if (activeOnly) {
      query.is_active = true;
    }

    const testimonials = await Testimonial.find(query).sort({ order: 1, created_at: -1 });

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST create new testimonial (requires authentication)
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
    if (!data.name || !data.occupation || !data.text) {
      return NextResponse.json(
        { error: 'Name, occupation, and text are required' },
        { status: 400 }
      );
    }

    // Handle order conflicts: if the order already exists, move existing testimonial to the end
    const orderValue = data.order || 0;
    const existingWithOrder = await Testimonial.findOne({ order: orderValue });

    if (existingWithOrder) {
      // Find the highest order number
      const allTestimonials = await Testimonial.find();
      const maxOrder = allTestimonials.length > 0
        ? Math.max(...allTestimonials.map(t => t.order || 0))
        : 0;

      // Move the existing testimonial to the end
      await Testimonial.findByIdAndUpdate(existingWithOrder._id, {
        order: maxOrder + 1,
        updated_at: new Date(),
      });
    }

    // Create new testimonial
    const testimonial = await Testimonial.create({
      ...data,
      created_by: getAdminEmail(),
      updated_by: getAdminEmail(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error('Testimonial create error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

// PUT update testimonial (requires authentication)
export async function PUT(request) {
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

    if (!data.id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    // Get the current testimonial being updated
    const currentTestimonial = await Testimonial.findById(data.id);
    if (!currentTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    // Handle order conflicts: if changing to an order that already exists (and it's not the current one)
    const newOrder = data.order !== undefined ? data.order : currentTestimonial.order;
    const existingWithOrder = await Testimonial.findOne({
      order: newOrder,
      _id: { $ne: data.id }
    });

    if (existingWithOrder) {
      // Find the highest order number
      const allTestimonials = await Testimonial.find();
      const maxOrder = allTestimonials.length > 0
        ? Math.max(...allTestimonials.map(t => t.order || 0))
        : 0;

      // Move the existing testimonial to the end
      await Testimonial.findByIdAndUpdate(existingWithOrder._id, {
        order: maxOrder + 1,
        updated_at: new Date(),
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      data.id,
      {
        $set: {
          ...data,
          updated_at: new Date(),
          updated_by: getAdminEmail(),
        }
      },
      { new: true }
    );

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Testimonial update error:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE testimonial (requires authentication)
export async function DELETE(request) {
  try {
    // Verify session
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookie(cookieHeader);
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Testimonial delete error:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
