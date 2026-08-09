/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep portable: no server-only features used, so a static export remains possible.
  // To produce a static build for GitHub Pages / Netlify, set: output: 'export'
};

export default nextConfig;
