import { FaExclamationTriangle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Link from 'next/link';
import styles from '@/styles/404.module.css';

export default function NotFoundPage() {
  return (
    <Layout title='Ой.. Страница не найдена'>
      <div className={styles.error}>
        <h1>
          <div className={styles.flexal}>
            <FaExclamationTriangle />
            404
          </div>
        </h1>
        <h4>Извините, но здесь ничего нет</h4>
        <Link href='/'>Вернуться на главную</Link>
      </div>
    </Layout>
  );
}
