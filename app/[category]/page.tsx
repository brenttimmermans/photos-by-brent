import exifr from 'exifr'
import { promises as fs } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const BASE_PATH = `${process.cwd()}/public/images`

interface Props {
  params: { category: string }
}

export default async function CategoryPage({ params }: Props) {
  const files = (await fs.readdir(`${BASE_PATH}/${params.category}`)).filter(
    filename => filename.endsWith('.jpg') || filename.endsWith('.jpeg'),
  )

  const metadata: {
    [key: string]: { ExifImageWidth: number; ExifImageHeight: number }
  } = Object.fromEntries(
    await Promise.all(
      files.map(async file => {
        const exif = await exifr.parse(
          `${BASE_PATH}/${params.category}/${file}`,
          ['ExifImageWidth', 'ExifImageHeight'],
        )

        return [file, exif]
      }),
    ),
  )

  return (
    <>
      <div className={styles.grid}>
        {Object.entries(metadata).map(([file, metadata]) => {
          const { ExifImageWidth, ExifImageHeight } = metadata
          const isHorizontal = ExifImageWidth > ExifImageHeight

          return (
            <Link
              key={file}
              href={`/${params.category}/${file}`}
              className={isHorizontal ? styles.horizontal : styles.vertical}
            >
              <Image
                src={`/images/${params.category}/${file}`}
                alt={file}
                width={ExifImageWidth}
                height={ExifImageHeight}
                className={styles.gridImage}
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}
