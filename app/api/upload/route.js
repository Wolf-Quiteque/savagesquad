import { NextResponse } from 'next/server';
import { getSessionFromCookie, verifySession } from '@/lib/auth';
import sharp from 'sharp';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request) {
  try {
    // Verify session
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookie(cookieHeader);
    const isValid = await verifySession(sessionToken);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Get original file size for comparison
    const originalSize = buffer.length;

    // Optimize image with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(2000, 2000, { // Max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 }) // Convert to WebP with 85% quality
      .toBuffer();

    // Calculate compression ratio
    const optimizedSize = optimizedBuffer.length;
    const compressionRatio = ((1 - (optimizedSize / originalSize)) * 100).toFixed(2);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `uploads/${timestamp}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;

    // Upload to R2
    const url = await uploadToR2(optimizedBuffer, fileName);

    return NextResponse.json({
      success: true,
      url,
      fileName,
      size: optimizedSize,
      originalSize,
      compressionRatio: `${compressionRatio}%`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
