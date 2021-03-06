import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; SMARTCARWASH</p>
      <p>
        <Link href='/about'>Информация о проекте</Link>
      </p>
    </footer>
  );
}
