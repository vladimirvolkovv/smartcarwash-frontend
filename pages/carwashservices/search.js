import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ServiceItem from '@/components/ServiceItem';
import { API_URL } from '@/config/index';

export default function SearchPage({ services }) {
  const router = useRouter();
  return (
    <Layout title='Результаты поиска'>
      <Link href='/carwashservices'>Назад</Link>
      <h1>Результаты поиска для {router.query.term}</h1>

      {services.length === 0 && <h3>Ничего не нашлось </h3>}
      {services.map((el) => {
        return <ServiceItem key={el.id} serv={el} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { description_contains: term }],
    },
  });
  const res = await fetch(`${API_URL}/services?${query}`);
  const services = await res.json();

  return {
    props: { services },
  };
}
