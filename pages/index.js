import Link from 'next/link';
import Layout from '@/components/Layout';
import ServiceItem from '@/components/ServiceItem';
import { API_URL } from '@/config/index';

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Лучшие предложения автомойки здесь!</h1>

      {events.length === 0 && <h3>В данный момент нет акционных предложений!</h3>}
      {events.map((el) => {
        return <ServiceItem key={el.id} evt={el} />;
      })}

      {events.length > 0 && (
        <Link href='/carwashservices'>
          <a className='btn-secondary'>Посмотреть все предложения</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/carwashservices`);
  const events = await res.json();

  return {
    props: { events: events.slice(3) },
    revalidate: 1,
  };
}
