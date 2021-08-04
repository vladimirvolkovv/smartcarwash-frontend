import Link from 'next/link';
import Layout from '@/components/Layout';
import ServiceItem from '@/components/ServiceItem';
import { API_URL } from '@/config/index';

export default function Home({ services }) {
  return (
    <Layout>
      <h1>Популярные услуги</h1>

      {services.length === 0 && <h3>В данный момент нет акционных предложений!</h3>}
      {services.map((el) => {
        return <ServiceItem key={el.id} serv={el} />;
      })}

      {services.length > 0 && (
        <Link href='/carwashservices'>
          <a className='btn-secondary'>Посмотреть все предложения</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/services?_sort=date:ASC&_limit=3`);
  const services = await res.json();

  return {
    props: { services: services },
    revalidate: 1,
  };
}
