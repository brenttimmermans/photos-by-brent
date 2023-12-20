import exifr from 'exifr'
import { promises as fs } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const BASE_PATH = `${process.cwd()}/public/images`

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const files = (await fs.readdir(`${BASE_PATH}/${params.category}`)).filter(
    filename => filename.endsWith('.jpg') || filename.endsWith('.jpeg'),
  )

  const metadata = Object.fromEntries(
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
    <div>
      <Link href="/">{params.category.toUpperCase()}</Link>
      <div className={styles.grid}>
        {files.map(file => {
          const { ExifImageWidth, ExifImageHeight } = metadata[file]
          const isHorizontal = ExifImageWidth > ExifImageHeight

          return (
            <Image
              key={file}
              src={`/images/${params.category}/${file}`}
              alt={file}
              width={ExifImageWidth}
              height={ExifImageHeight}
              className={`
              ${styles.gridImage} ${
                isHorizontal ? styles.horizontal : styles.vertical
              }
              `}
            />
          )
        })}
      </div>
    </div>
  )
}
