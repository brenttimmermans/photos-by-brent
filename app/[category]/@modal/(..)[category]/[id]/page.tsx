import exifr from 'exifr'
import fs from 'fs/promises'
import ImageModal from './ImageModal'

const BASE_PATH = `${process.cwd()}/public/images`

interface Props {
  params: { category: string; id: string }
}

export default async function CategoryDetailModal({ params }: Props) {
  const files = (await fs.readdir(`${BASE_PATH}/${params.category}`)).filter(
    filename => filename.endsWith('.jpg') || filename.endsWith('.jpeg'),
  )

  const exif = await exifr.parse(
    `${BASE_PATH}/${params.category}/${params.id}`,
    ['ExifImageWidth', 'ExifImageHeight'],
  )

  const getNextImage = (file: string) => {
    const index = files.indexOf(file)
    const nextIndex = index === files.length - 1 ? 0 : index + 1

    return files[nextIndex]
  }

  const getPreviousImage = (file: string) => {
    const index = files.indexOf(file)
    const previousIndex = index === 0 ? files.length - 1 : index - 1

    return files[previousIndex]
  }

  return (
    <ImageModal
      category={params.category}
      name={params.id}
      previous={getPreviousImage(params.id)}
      next={getNextImage(params.id)}
      width={exif.ExifImageWidth}
      height={exif.ExifImageHeight}
    />
  )
}
