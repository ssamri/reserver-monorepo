/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'react-bootstrap']
  },
  output: 'standalone'
};

export default nextConfig;
