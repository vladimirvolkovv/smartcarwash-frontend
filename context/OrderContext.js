import { createContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    localStorage.getItem('orderItems') === null
      ? setOrderItems([])
      : setOrderItems(JSON.parse(localStorage.getItem('orderItems')));
  }, []);

  const addItem = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
    localStorage.setItem('orderItems', JSON.stringify([...orderItems, item]));
  };

  return <OrderContext.Provider value={{ orderItems, addItem }}>{children}</OrderContext.Provider>;
};

export default OrderContext;
