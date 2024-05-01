import React, { useState } from 'react';
import {useTheme} from '../../ThemeContext';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const WalletManagment = ({walletOwner, balance}) => {

  const [inputValue, setinputValue] = useState('');
  const { isDarkMode } = useTheme();


  const handleInputChange = (char) => {
    if (parseInt(char.target.value) >= 0)
      setinputValue(char.target.value);
  };

  const makePayment = async () => {
    try{
      //klucz publiczny do testów
      const key = 'pk_test_51PAvWC1PDN4klyO5gI9rRb7hQLFi1nqNazo5L5K2pmbRu6SDCwCLe4bo9Udj5uPqSXrA6mNeMDEfP75sfPLHaX05006ffHvcb3'

      //ładuje stripe
      const stripe = await loadStripe(key);

      //pobieram sessionId z backendu
      const response = await axios.get(`http://localhost:8000/payment/${inputValue}`);          
      console.log(response);
      const sessionId = response.data.sessionId;
      
      //przekierowanie do płatności
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
       });
      
      if (error) {
        // Obsługa błędu płatności
        console.error('Payment failed:', error);
        // Przekierowanie na endpoint /fail
        window.location.href = 'http://localhost:8000/payment/fail';
      } else {
        // Płatność zakończona sukcesem
        // Przekierowanie na endpoint /success
        window.location.href = 'http://localhost:8000/payment/success';
      }

      
    }catch (err) {
      console.error('Payment failed:', err);
      window.location.href = '/fail';
    }
  }

  return (
    <div className='flex flex-col md:flex-row w-full h-full p-2'>
      {/* Left Section */}
      <div className={`${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-900 to-blue-800'} p-6 rounded-xl mt-2 h-full md:w-1/2 md:pr-12`}>
        <p className='mb-4'>Your balance:</p>
        <div className='flex items-center'>
          <div className='flex shadow-black shadow-inner max-w-fit p-2 px-4 rounded-xl'>
            <p>{balance}</p>
            &nbsp;$
          </div>
        </div>
        <p className='mb-4 mt-8'>Deposit:</p>
        <div className='my-4 flex h-10'>
          <input
            type='number'
            className={`${isDarkMode ? 'bg-[#292730]' : 'bg-white'} rounded-xl shadow-black shadow-inner border-none w-full md:w-2/3`}
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <button className='px-2 ml-4 border border-white rounded-lg text-sm min-w-fit flex justify-center items-center' onClick={makePayment}>
            <i className='fa-solid fa-sack-dollar text-xs'></i>&nbsp;<p>Top up</p>
          </button>
        </div>
        <div className='flex flex-col'>
          <p>Payment methods:</p>
          <div className='flex'>
            <button className='mt-4 py-2 px-4 border border-white border-[#1b1920] rounded-xl shadow-md'>
              <i className='fa-brands fa-stripe text-[1.5rem] md:text-[3rem]'></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={` ${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900'} p-6 rounded-xl mt-2 h-full md:w-1/2 md:ml-6`}>
        <div className='min-w-full'>
          <h1 className='text-lg md:text-2xl'>Transactions:</h1>
          <div className='mt-2 flex flex-col md:flex-row justify-between text-sm border-b-2 border-white py-2'>
            <p className='text-zinc-400 mb-2 md:mb-0'>Type</p>
            <p className='text-zinc-400 mb-2 md:mb-0'>Amount</p>
            <p className='text-zinc-400'>Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletManagment;
