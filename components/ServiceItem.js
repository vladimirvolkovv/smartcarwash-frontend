import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/ServiceItem.module.css';

export default function ServiceItem({ serv }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={serv.image ? serv.image.formats.thumbnail.url : '/images/event-default.png'}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <h3>{serv.name}</h3>
        <h4>{serv.price} ₽ </h4>
        <span>Время выполнения: {serv.time} минут</span>
      </div>
      <div className={styles.link}>
        <Link href={`/carwashservices/${serv.slug}`}>
          <a className='btn'>Подробности</a>
        </Link>
        <a className='btn'>Добавить в заказ</a>
      </div>
    </div>
  );
}
