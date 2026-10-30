/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './app/lib/imageLoader.ts',
    // The only widths scripts/generate-images.mjs renders.
    deviceSizes: [640, 828, 1200, 1920, 3840],
    imageSizes: [],
  },
}

module.exports = nextConfig
