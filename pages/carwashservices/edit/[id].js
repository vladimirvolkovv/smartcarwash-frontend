import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function EditServicePage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.small.url : null);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((el) => el === '');
    if (hasEmptyFields) {
      toast.error('Пожалуйста, заполните все поля!');
    }

    const res = await fetch(`${API_URL}/services/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('Что-то пошло не так');
    } else {
      const evt = await res.json();
      router.push(`/carwashservices/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/services/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title='Редактировать услугу'>
      <Link href='/carwashservices'>Назад</Link>
      <h1>Редактировать услугу</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input type='text' name='venue' id='venue' value={values.venue} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input type='text' name='address' id='address' value={values.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input type='text' name='time' id='time' value={values.time} onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type='submit' value='Add Event' className='btn' />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? <Image src={imagePreview} height={100} width={170} /> : <div>Нет загруженных изображений</div>}
      <div>
        <button onClick={() => setShowModal(true)} className='btn-secondary'>
          <FaImage /> Выберите изображение
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/services/${id}`);
  const evt = await res.json();

  console.log(req.headers.cookie);

  return {
    props: {
      evt,
    },
  };
}
