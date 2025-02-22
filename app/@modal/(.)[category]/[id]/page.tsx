import { getCategoryImages, getImageExifProperties } from '@/app/lib/data';
import { Category } from '@/app/types';
import { redirect } from 'next/navigation';
import CategoryDetailModal from './CategoryDetailModal';

interface Props {
  params: Promise<{ category: Category; id: string }>;
}

export default async function CategoryDetailModalContainer({ params }: Props) {
  const { category, id: image } = await params;

  const files = await getCategoryImages(category);
  let exif;
  try {
    exif = await getImageExifProperties(category, image, [
      'ExifImageWidth',
      'ExifImageHeight',
    ]);
  } catch (error) {
    redirect(`/${category}`);
  }

  const getNextImage = (file: string) => {
    const index = files.indexOf(file);
    const nextIndex = index === files.length - 1 ? 0 : index + 1;

    return files[nextIndex];
  };

  const getPreviousImage = (file: string) => {
    const index = files.indexOf(file);
    const previousIndex = index === 0 ? files.length - 1 : index - 1;

    return files[previousIndex];
  };

  const width = exif.ExifImageWidth ?? 0;
  const height = exif.ExifImageHeight ?? 0;

  return (
    <CategoryDetailModal
      category={category}
      name={image}
      width={width}
      height={height}
      previous={getPreviousImage(image)}
      next={getNextImage(image)}
    />
  );
}
