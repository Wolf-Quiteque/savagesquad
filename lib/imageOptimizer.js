import sharp from 'sharp';

/**
 * Image optimization configuration
 * Quality: 85% WebP (optimal balance between quality and file size)
 * Expected compression: 50-80% reduction from original
 */
const OPTIMIZATION_CONFIG = {
  webp: {
    quality: 85,
    effort: 4, // 0-6, higher = better compression but slower
  },
  sizes: {
    full: { width: 2000, height: 2000 },
    large: { width: 1200, height: 1200 },
    medium: { width: 800, height: 800 },
    small: { width: 400, height: 400 },
    thumbnail: { width: 150, height: 150 },
  },
};

/**
 * Optimize image with sharp
 * @param {Buffer} buffer - Original image buffer
 * @param {Object} options - Optimization options
 * @returns {Promise<Buffer>} Optimized image buffer
 */
export async function optimizeImage(buffer, options = {}) {
  const {
    width = 2000,
    height = 2000,
    quality = 85,
    format = 'webp',
  } = options;

  try {
    let pipeline = sharp(buffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    // Apply format-specific optimization
    if (format === 'webp') {
      pipeline = pipeline.webp({
        quality,
        effort: OPTIMIZATION_CONFIG.webp.effort,
      });
    } else if (format === 'jpeg' || format === 'jpg') {
      pipeline = pipeline.jpeg({
        quality,
        progressive: true,
        mozjpeg: true,
      });
    } else if (format === 'png') {
      pipeline = pipeline.png({
        quality,
        compressionLevel: 9,
      });
    }

    return await pipeline.toBuffer();
  } catch (error) {
    console.error('Image optimization error:', error);
    throw error;
  }
}

/**
 * Generate multiple image sizes for responsive design
 * @param {Buffer} buffer - Original image buffer
 * @returns {Promise<Object>} Object with different sized buffers
 */
export async function generateResponsiveSizes(buffer) {
  const sizes = {};

  for (const [sizeName, dimensions] of Object.entries(OPTIMIZATION_CONFIG.sizes)) {
    sizes[sizeName] = await optimizeImage(buffer, {
      width: dimensions.width,
      height: dimensions.height,
    });
  }

  return sizes;
}

/**
 * Generate thumbnail for admin preview
 * @param {Buffer} buffer - Original image buffer
 * @returns {Promise<Buffer>} Thumbnail buffer
 */
export async function generateThumbnail(buffer) {
  const { thumbnail } = OPTIMIZATION_CONFIG.sizes;

  return await sharp(buffer)
    .resize(thumbnail.width, thumbnail.height, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 80 })
    .toBuffer();
}

/**
 * Get image metadata
 * @param {Buffer} buffer - Image buffer
 * @returns {Promise<Object>} Image metadata
 */
export async function getImageMetadata(buffer) {
  const metadata = await sharp(buffer).metadata();

  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    space: metadata.space,
    channels: metadata.channels,
    depth: metadata.depth,
    hasAlpha: metadata.hasAlpha,
  };
}

/**
 * Calculate compression statistics
 * @param {number} originalSize - Original file size in bytes
 * @param {number} optimizedSize - Optimized file size in bytes
 * @returns {Object} Compression statistics
 */
export function calculateCompressionStats(originalSize, optimizedSize) {
  const ratio = ((1 - (optimizedSize / originalSize)) * 100).toFixed(2);
  const savedBytes = originalSize - optimizedSize;

  return {
    originalSize,
    optimizedSize,
    compressionRatio: `${ratio}%`,
    savedBytes,
    savedKB: (savedBytes / 1024).toFixed(2),
    savedMB: (savedBytes / (1024 * 1024)).toFixed(2),
  };
}

export default {
  optimizeImage,
  generateResponsiveSizes,
  generateThumbnail,
  getImageMetadata,
  calculateCompressionStats,
  OPTIMIZATION_CONFIG,
};
