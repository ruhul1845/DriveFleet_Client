/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/server-api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ];
  }
};
export default nextConfig;
