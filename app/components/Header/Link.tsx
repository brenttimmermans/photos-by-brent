'use client';

import clsx from 'clsx';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import styles from './Link.module.css';

interface Props extends PropsWithChildren {
  path: string;
  disabled?: boolean;
}

export default function Link({ children, path, disabled = false }: Props) {
  const currentPath = usePathname();
  const active = currentPath === path;

  return (
    <NextLink
      href={path}
      aria-disabled={disabled}
      className={clsx(styles.link, active && styles.active)}
    >
      {children}
    </NextLink>
  );
}
