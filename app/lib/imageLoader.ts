interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: LoaderParams) {
  // Vercel's optimizer rejects SVG and is absent in dev; both serve the raw file.
  if (src.endsWith('.svg') || process.env.NODE_ENV !== 'production') {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
  });

  return `/_vercel/image?${params}`;
}
