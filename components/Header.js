import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import AuthContext from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>SMARTCARWASH</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          {/* <li>
            <Link href='/carwashservices'>
              <a>Услуги</a>
            </Link>
          </li> */}
          {user ? (
            <>
              {/* <li>
                <Link href='/account/dashboard'>
                  <a>Панель администратора</a>
                </Link>
              </li>
              <li>
                <Link href='/carwashservices/add'>
                  <a>Добавить услугу</a>
                </Link>
              </li> */}
              <li>
                <Link href='/order'>
                  <a>Заказы</a>
                </Link>
              </li>
              <li>
                <button className='btn-secondary btn-icon' onClick={() => logout()}>
                  <FaSignOutAlt /> Выход
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt />
                    Вход
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
