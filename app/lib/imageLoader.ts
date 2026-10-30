interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// Serves the renders from scripts/generate-images.mjs.
export default function imageLoader({ src, width }: LoaderParams) {
  if (src.endsWith('.svg') || process.env.NODE_ENV !== 'production') {
    return src;
  }

  const match = src.match(/^\/images\/(.+)\.[^./]+$/);
  if (!match) {
    return src;
  }

  return `/_img/${width}/${match[1]}.webp`;
}
