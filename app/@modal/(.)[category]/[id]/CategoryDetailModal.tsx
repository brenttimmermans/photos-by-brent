'use client';

import Image from '@/app/components/Image/Image';
import Modal from '@/app/components/Modal/Modal';
import useModal from '@/app/components/Modal/useModal';
import { Category } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';

interface Props {
  category: Category;
  name: string;
  previous: string;
  next: string;
  width: number;
  height: number;
}

export default function CategoryDetailModal({
  category,
  name: photoId,
  previous,
  next,
  width,
  height,
}: Props) {
  const { ref, openDialog, closeDialog } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!ref.current?.open) {
      window.scrollTo(0, 0);
      openDialog();
    }
  }, [ref, openDialog, photoId]);

  const goToPreviousImage = useCallback(
    () => router.push(`/${category}/${previous}`),
    [router, category, previous],
  );
  const goToNextImage = useCallback(
    () => router.push(`/${category}/${next}`),
    [router, category, next],
  );
  const goBackToCategory = useCallback(() => {
    router.push(`/${category}`);
    closeDialog();
  }, [router, category, closeDialog]);

  // Adds keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousImage();
      }

      if (event.key === 'ArrowRight') {
        goToNextImage();
      }

      if (event.key === 'Escape') {
        goBackToCategory();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousImage, goToNextImage, goBackToCategory]);

  const handlePreviousClick = () => goToPreviousImage();
  const handleNextClick = () => goToNextImage();
  const handleCloseClick = () => goBackToCategory();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal ref={ref} isLoading={isLoading} onClose={handleCloseClick}>
      <Image
        key={photoId}
        src={`/images/${category}/${photoId}`}
        alt={photoId}
        width={width}
        height={height}
        className={styles.modalImage}
        onLoad={() => setIsLoading(false)}
      />
      <div className={styles.left} onClick={handlePreviousClick} />
      <div className={styles.right} onClick={handleNextClick} />
    </Modal>
  );
}
