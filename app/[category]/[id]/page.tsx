import exifr from 'exifr'
import Image from 'next/image'
import styles from './page.module.css'

import path from 'path'

interface Props {
  params: { category: string; id: string }
}

export default async function CategoryDetailPage({
  params: { category, id },
}: Props) {
  const filePath = path.resolve('public/images', category, id)
  const { ExifImageWidth, ExifImageHeight } = await exifr.parse(filePath, [
    'ExifImageWidth',
    'ExifImageHeight',
  ])

  return (
    <section className={styles.container}>
      <Image
        src={`/images/${category}/${id}`}
        alt={id}
        width={ExifImageWidth}
        height={ExifImageHeight}
        className={styles.image}
      />
    </section>
  )
}
