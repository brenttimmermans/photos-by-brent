'use client'

import Modal from '@/app/components/Modal/Modal'
import useModal from '@/app/components/Modal/useModal'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

interface Props {
  category: string
  name: string
  previous: string
  next: string
  width: number
  height: number
}

export default function ImageModal({
  category,
  name: photoId,
  previous,
  next,
  width,
  height,
}: Props) {
  const { ref, openDialog, closeDialog } = useModal()
  const router = useRouter()

  useEffect(openDialog, [openDialog, photoId])

  const handlePreviousClick = () => router.push(`/${category}/${previous}`)
  const handleNextClick = () => router.push(`/${category}/${next}`)

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
      />
      <div className={styles.left} onClick={handlePreviousClick}></div>
      <div className={styles.right} onClick={handleNextClick}></div>
    </Modal>
  )
}
