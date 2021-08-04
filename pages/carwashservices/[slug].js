import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Service.module.css';
import { useRouter } from 'next/router';
import OrderContext from '@/context/OrderContext';

export default function ServicePage({ srv }) {
  const router = useRouter();
  const { addItem } = useContext(OrderContext);

  const deleteEvent = async (e) => {
    if (confirm('Вы уверены?')) {
      const res = await fetch(`${API_URL}/services/${srv.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/carwashservices');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/carwashservices/edit/${srv.id}`}>
            <a>
              <FaPencilAlt /> Редактировать услугу
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Удалить услугу
          </a>
        </div>
        <span>Время выполнения: {srv.time} минут</span>

        <h1>{srv.name}</h1>
        <p>
          <a onClick={() => addItem({ id: srv.id, name: srv.name, price: srv.price, time: srv.time })} className='btn'>
            Добавить в заказ
          </a>
        </p>
        <ToastContainer />
        {srv.image && (
          <div className={styles.image}>
            <Image src={srv.image.formats.large.url} width={960} height={600} />
          </div>
        )}
        <h3>Стоимость:</h3>
        <p>{srv.price} ₽</p>
        <h3>Описание:</h3>
        <p>{srv.description}</p>

        <Link href='/carwashservices'>
          <a className={styles.back}> Назад</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/services`);
  const services = await res.json();
  const paths = services.map((srv) => ({
    params: { slug: srv.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/services?slug=${slug}`);
  const services = await res.json();
  return {
    props: {
      srv: services[0],
    },
    revalidate: 1,
  };
}
