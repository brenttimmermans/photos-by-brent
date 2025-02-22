import Image from '@/app/components/Image/Image';
import { getImageExifProperties } from '@/app/lib/data';
import { Category } from '@/app/types';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

interface Props {
  params: Promise<{ category: Category; id: string }>;
}

export default async function CategoryDetailPage({ params }: Props) {
  const { category, id: image } = await params;

  let exif;
  try {
    exif = await getImageExifProperties(category, image, [
      'ExifImageWidth',
      'ExifImageHeight',
    ]);
  } catch (error) {
    redirect(`/${category}`);
  }

  const width = exif.ExifImageWidth ?? 0;
  const height = exif.ExifImageHeight ?? 0;

  return (
    <section className={styles.container}>
      <Image
        src={`/images/${category}/${image}`}
        alt={image}
        width={width}
        height={height}
        className={styles.image}
        // Force style priority over className
        style={{ width: 'auto', height: 'auto' }}
      />
    </section>
  );
}
