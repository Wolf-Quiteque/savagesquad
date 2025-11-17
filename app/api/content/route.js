import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession, getAdminEmail } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';
import ContentVersion from '@/models/ContentVersion';

// GET all content or content by page/section
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const sectionId = searchParams.get('section_id');

    let query = {};

    if (sectionId) {
      query.section_id = sectionId;
    } else if (page) {
      query['metadata.page'] = page;
    }

    const content = await SiteContent.find(query).sort({ 'metadata.order': 1 });

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

// POST/UPDATE content (requires authentication)
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
    if (!data.section_id || !data.content_type) {
      return NextResponse.json(
        { error: 'section_id and content_type are required' },
        { status: 400 }
      );
    }

    // Get existing content for versioning
    const existingContent = await SiteContent.findOne({ section_id: data.section_id });

    // Save version history if content exists
    if (existingContent) {
      const latestVersion = await ContentVersion.findOne({ section_id: data.section_id })
        .sort({ version: -1 });

      const newVersion = (latestVersion?.version || 0) + 1;

      await ContentVersion.create({
        section_id: existingContent.section_id,
        version: newVersion,
        content_type: existingContent.content_type,
        content: existingContent.content,
        metadata: existingContent.metadata,
        created_by: getAdminEmail(),
        change_description: data.change_description || 'Content updated',
      });
    }

    const content = await SiteContent.findOneAndUpdate(
      { section_id: data.section_id },
      {
        ...data,
        updated_at: new Date(),
        updated_by: getAdminEmail(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Content save error:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

// PUT update existing content (requires authentication)
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

    if (!data.section_id) {
      return NextResponse.json(
        { error: 'section_id is required' },
        { status: 400 }
      );
    }

    const content = await SiteContent.findOneAndUpdate(
      { section_id: data.section_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
          updated_by: getAdminEmail(),
        }
      },
      { new: true }
    );

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

// DELETE content (requires authentication)
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
    const sectionId = searchParams.get('section_id');

    if (!sectionId) {
      return NextResponse.json(
        { error: 'section_id is required' },
        { status: 400 }
      );
    }

    const content = await SiteContent.findOneAndDelete({ section_id: sectionId });

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Content deleted' });
  } catch (error) {
    console.error('Content delete error:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
