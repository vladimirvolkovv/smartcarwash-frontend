import Layout from '@/components/Layout';
import ServiceItem from '@/components/ServiceItem';
import { API_URL, PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';

export default function CarwashServices({ services, page, total }) {
  return (
    <Layout>
      <h1>Лучшие предложения автомойки здесь!</h1>

      {services.length === 0 && <h3>В данный момент нет акционных предложений!</h3>}
      {services.map((el) => {
        return <ServiceItem key={el.id} serv={el} />;
      })}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/services/count`);
  const total = await totalRes.json();

  const servRes = await fetch(`${API_URL}/services?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const services = await servRes.json();

  return {
    props: { services, page: +page, total },
  };
}
