/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api/v1/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8080/api/v1/:path*'
            : '/api/v1'
      }
    ];
  },
  experimental: {
    serverActions: true
  },
  env: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
};

module.exports = nextConfig;
