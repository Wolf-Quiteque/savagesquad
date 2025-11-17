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
