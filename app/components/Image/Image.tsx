import { toBase64 } from '@/app/lib/toBase64';
import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import styles from './Image.module.css';

interface Props extends NextImageProps {
  clickable?: boolean;
}

export default function Image({
  className,
  clickable = false,
  ...props
}: Props) {
  return (
    <NextImage
      {...props}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(props.width as number, props.height as number),
      )}`}
      className={clsx(styles.image, className, clickable && styles.clickable)}
    />
  );
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#EEE" offset="20%" />
      <stop stop-color="#DDD" offset="50%" />
      <stop stop-color="#EEE" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#EEE" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite"  />
</svg>`;
