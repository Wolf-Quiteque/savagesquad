/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true, // Disable image optimization for static exports if needed
    domains: ['savagesquad.vercel.app'], // Add your domain
  },
};

export default nextConfig;
