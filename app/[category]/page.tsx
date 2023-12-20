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
  const files = await fs.readdir(`${BASE_PATH}/${params.category}`)

  return (
    <div>
      <Link href="/">{params.category.toUpperCase()}</Link>
      <div className={styles.grid}>
        {files.map(async file => {
          const { ExifImageWidth, ExifImageHeight } = await exifr.parse(
            `${BASE_PATH}/${params.category}/${file}`,
          )

          const isHorizontal = ExifImageWidth > ExifImageHeight

          const width = isHorizontal ? 600 : 400
          const height = isHorizontal ? 400 : 600

          return (
            <Image
              key={file}
              src={`/images/${params.category}/${file}`}
              alt={file}
              width={width}
              height={height}
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
