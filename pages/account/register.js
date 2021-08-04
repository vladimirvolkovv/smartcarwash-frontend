import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('Пароли не совпадают!');
    }
    register({ username, email, password });
  };

  return (
    <Layout title='Регистрация'>
      <div className={styles.auth}>
        <h1>Регистрация</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Имя пользователя</label>
            <input type='text' id='username' value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <label htmlFor='email'>Адрес электронной почты</label>
            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor='password'>Пароль</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Пароль повторно</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Зарегистрироваться' className='btn' />
        </form>
        <p>
          Уже есть аккаунт? <Link href='/account/login'>Войти</Link>
        </p>
      </div>
    </Layout>
  );
}
