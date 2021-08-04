import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/carwashservices?page=${page - 1}`}>
          <a className='btn-secondary'>Предыдущая страница</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/carwashservices?page=${page + 1}`}>
          <a className='btn-secondary'>Следующая страница</a>
        </Link>
      )}
    </>
  );
}
