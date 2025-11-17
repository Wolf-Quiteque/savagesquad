import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

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
