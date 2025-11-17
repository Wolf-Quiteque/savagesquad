import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import ContentVersion from '@/models/ContentVersion';
import SiteContent from '@/models/SiteContent';

// GET version history for a section
export async function GET(request) {
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

    const versions = await ContentVersion.find({ section_id: sectionId })
      .sort({ version: -1 })
      .limit(50); // Limit to last 50 versions

    return NextResponse.json({ versions });
  } catch (error) {
    console.error('Version fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch versions' }, { status: 500 });
  }
}

// POST restore a specific version
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

    const { section_id, version } = await request.json();

    if (!section_id || version === undefined) {
      return NextResponse.json(
        { error: 'section_id and version are required' },
        { status: 400 }
      );
    }

    // Get the version to restore
    const versionToRestore = await ContentVersion.findOne({
      section_id,
      version
    });

    if (!versionToRestore) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // Get current content to save as new version before restoring
    const currentContent = await SiteContent.findOne({ section_id });

    if (currentContent) {
      // Save current as a version before restoring
      const latestVersion = await ContentVersion.findOne({ section_id })
        .sort({ version: -1 });

      const newVersion = (latestVersion?.version || 0) + 1;

      await ContentVersion.create({
        section_id: currentContent.section_id,
        version: newVersion,
        content_type: currentContent.content_type,
        content: currentContent.content,
        metadata: currentContent.metadata,
        created_by: versionToRestore.created_by,
        change_description: `Restored from version ${version}`,
      });
    }

    // Restore the version
    const restoredContent = await SiteContent.findOneAndUpdate(
      { section_id },
      {
        section_id: versionToRestore.section_id,
        content_type: versionToRestore.content_type,
        content: versionToRestore.content,
        metadata: versionToRestore.metadata,
        updated_at: new Date(),
        updated_by: versionToRestore.created_by,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      content: restoredContent,
      message: `Restored to version ${version}`
    });
  } catch (error) {
    console.error('Version restore error:', error);
    return NextResponse.json({ error: 'Failed to restore version' }, { status: 500 });
  }
}
