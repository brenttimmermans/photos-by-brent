import { Category } from '@/app/types';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export default async function CategoryLayout({ params, children }: Props) {
  const { category } = await params;

  if (!(category in Category)) {
    redirect('/');
  }

  return <>{children}</>;
}
