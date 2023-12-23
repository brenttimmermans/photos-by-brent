import Image from '@/app/components/Image/Image'
import { getCategoryImages, getImagesExifProperties } from '@/app/lib/data'
import Link from 'next/link'
import styles from './page.module.css'

interface Props {
  params: { category: string }
}

export default async function CategoryPage({ params: { category } }: Props) {
  const files = await getCategoryImages(category)
  const metadata = await getImagesExifProperties(category, files, [
    'ExifImageWidth',
    'ExifImageHeight',
  ])

  return (
    <>
      <div className={styles.grid}>
        {Object.entries(metadata).map(([image, exif]) => {
          const isHorizontal =
            (exif.ExifImageWidth ?? 0) > (exif.ExifImageHeight ?? 0)

          const width = isHorizontal ? 600 : 400
          const height = isHorizontal ? 400 : 600

          return (
            <Link
              key={image}
              href={`/${category}/${image}`}
              className={isHorizontal ? styles.horizontal : styles.vertical}
            >
              <Image
                src={`/images/${category}/${image}`}
                alt={image}
                width={width}
                height={height}
                clickable
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}
