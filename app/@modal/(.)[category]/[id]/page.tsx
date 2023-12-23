import exifr from 'exifr'
import fs from 'fs/promises'
import path from 'path'
import CategoryDetailModal from './CategoryDetailModal'

interface Props {
  params: { category: string; id: string }
}

export default async function CategoryDetailModalContainer({ params }: Props) {
  const filesPath = path.resolve('public/images', params.category)
  const files = (await fs.readdir(filesPath)).filter(
    filename => filename.endsWith('.jpg') || filename.endsWith('.jpeg'),
  )

  const exif = await exifr.parse(path.resolve(filesPath, params.id), [
    'ExifImageWidth',
    'ExifImageHeight',
  ])

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
    <CategoryDetailModal
      category={params.category}
      name={params.id}
      previous={getPreviousImage(params.id)}
      next={getNextImage(params.id)}
      width={exif.ExifImageWidth}
      height={exif.ExifImageHeight}
    />
  )
}
