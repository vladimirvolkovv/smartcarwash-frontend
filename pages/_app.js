import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { OrderProvider } from '@/context/OrderContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <OrderProvider>
        <Component {...pageProps} />
      </OrderProvider>
    </AuthProvider>
  );
}

export default MyApp;
