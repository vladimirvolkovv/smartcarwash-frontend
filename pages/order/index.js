import { useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import OrderContext from '@/context/OrderContext';
import styles from '@/styles/OrderItem.module.css';

export default function OrderPage() {
  const { orderItems } = useContext(OrderContext);
  const summ = orderItems.reduce((acc, val) => acc + val.price, 0);
  const summTime = orderItems.reduce((acc, val) => acc + Number(val.time), 0);
  return (
    <Layout title='Заказы'>
      <h1>Создание заказа</h1>

      {orderItems.map((item) => (
        <div key={item.id} className={styles.order}>
          <div className={styles.info}>
            <h4>{item.name}</h4>
            <div>{item.time} минут</div>
            <div>{item.price} руб</div>
          </div>
        </div>
      ))}
      <h2>Общая сумма: {summ} ₽</h2>
      <h2>Время выполнения: {summTime} минут </h2>
    </Layout>
  );
}
