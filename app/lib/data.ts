import exifr from 'exifr';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_PATH = path.resolve('public/images');

export const getCategoryImages = async (
  category: string,
): Promise<string[]> => {
  const filesPath = path.resolve(IMAGES_PATH, category);
  const files = (await fs.readdir(filesPath)).filter(
    filename => filename.endsWith('.jpg') || filename.endsWith('.jpeg'),
  );

  return files;
};

export interface ExifData {
  ExifImageWidth: number;
  ExifImageHeight: number;
}

type ExifProperty = keyof ExifData;

export async function getImageExifProperties<K extends string>(
  category: string,
  image: string,
  properties: ExifProperty[],
): Promise<Partial<ExifData>> {
  const filePath = path.resolve(IMAGES_PATH, category, image);
  const exif: Partial<ExifData> = await exifr.parse(filePath, properties);

  return exif;
}

export async function getImagesExifProperties<K extends string>(
  category: string,
  images: string[],
  properties: ExifProperty[],
): Promise<Record<string, Partial<ExifData>>> {
  return Object.fromEntries(
    await Promise.all(
      images.map(async image => [
        image,
        await getImageExifProperties(category, image, properties),
      ]),
    ),
  );
}
