import React, { createContext, useContext, useState, useEffect } from 'react';
import { readRemoteFile } from 'react-native-csv';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const CSV_URLS = {
  pin: 'https://drive.google.com/uc?export=download&id=13dCfet4idppJZ4EUm8RrekaTJuDXeCZc',
  product: 'https://drive.google.com/uc?export=download&id=1nihoMbdNu99DxoDhyzkIesN9odfN0INu',
  stock: 'https://drive.google.com/uc?export=download&id=1cigaq9_Ca2kKc2eHwiepdImKDSrF1DXm',
};

export const DataProvider = ({ children }) => {
  const [pinData, setPinData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      readRemoteFile(url, {
        complete: (results) => setData(results.data),
        error: (error) => console.error('Error reading CSV file:', error),
      });
    };

    fetchData(CSV_URLS.pin, setPinData);
    fetchData(CSV_URLS.product, setProductData);
    fetchData(CSV_URLS.stock, setStockData);
  }, []);

  return (
    <DataContext.Provider value={{ pinData, productData, stockData }}>
      {children}
    </DataContext.Provider>
  );
};
