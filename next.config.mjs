/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Suppress workspace root warning di Coolify/Docker
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
