import clsx from 'clsx'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import styles from './Image.module.css'

interface Props extends NextImageProps {
  clickable?: boolean
}

export default function Image({
  className,
  clickable = false,
  ...props
}: Props) {
  return (
    <NextImage
      {...props}
      className={clsx(styles.image, className, clickable && styles.clickable)}
    />
  )
}
