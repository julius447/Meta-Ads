import type { NextConfig } from 'next';

/**
 * Statisk export → GitHub Pages (julius447/Meta-Ads).
 * basePath krävs eftersom sajten serveras från /Meta-Ads/, inte roten.
 * OBS: basePath fixar bara next-routern + next/image — RÅA <img src> och url()
 * måste prefixas manuellt med NEXT_PUBLIC_BASE_PATH (se lib/asset.ts).
 */
const repo = 'Meta-Ads';
const isCI = process.env.GITHUB_ACTIONS === 'true';
const basePath = isCI ? `/${repo}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // annars 404 på /campaign/x på GH Pages
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
