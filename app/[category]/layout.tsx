import { Category } from '@/app/types';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    category: string;
  };
}

export default function CategoryLayout({
  children,
  params: { category },
}: Props) {
  if (!(category in Category)) {
    redirect('/');
  }

  return <>{children}</>;
}
