'use client'

import Image from '@/app/components/Image/Image'
import Modal from '@/app/components/Modal/Modal'
import useModal from '@/app/components/Modal/useModal'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import styles from './page.module.css'

interface Props {
  category: string
  name: string
  previous: string
  next: string
  width: number
  height: number
}

export default function CategoryDetailModal({
  category,
  name: photoId,
  previous,
  next,
  width,
  height,
}: Props) {
  const { ref, openDialog, closeDialog } = useModal()
  const router = useRouter()

  useEffect(() => {
    if (!ref.current?.open) {
      window.scrollTo(0, 0)
      openDialog()
    }
  }, [ref, openDialog, photoId])

  const goToPreviousImage = useCallback(
    () => router.push(`/${category}/${previous}`),
    [router, category, previous],
  )
  const goToNextImage = useCallback(
    () => router.push(`/${category}/${next}`),
    [router, category, next],
  )

  // Adds keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousImage()
      }

      if (event.key === 'ArrowRight') {
        goToNextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goToPreviousImage, goToNextImage])

  const handlePreviousClick = () => goToPreviousImage()
  const handleNextClick = () => goToNextImage()
  const handleCloseClick = () => {
    closeDialog()
    router.push(`/${category}`)
  }

  return (
    <Modal ref={ref} onClose={handleCloseClick}>
      <Image
        key={photoId}
        src={`/images/${category}/${photoId}`}
        alt={photoId}
        width={width}
        height={height}
        className={styles.modalImage}
      />
      <div className={styles.left} onClick={handlePreviousClick}></div>
      <div className={styles.right} onClick={handleNextClick}></div>
    </Modal>
  )
}
