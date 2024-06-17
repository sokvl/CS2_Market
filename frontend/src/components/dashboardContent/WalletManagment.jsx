import React, { useState } from 'react';
import {useTheme} from '../../ThemeContext';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const WalletManagment = ({walletOwner, balance}) => {

  const [inputValue, setinputValue] = useState('');
  const { isDarkMode } = useTheme();


  if (walletOwner == null) {
    window.location.href = '/'
  }

  const handleInputChange = (e) => {
    setinputValue(e.target.value);
  };

  const makePayment = async () => {
    try{
      //klucz publiczny do testów
      const key = 'pk_test_51OcqX4B8zq9h3F6RI8C97GYmsgoa5I7U0oNv1IPzzZe5uZ7NYaYUN7NqXNmG5p1V0V18qKRnxZC2Oxu4tnXYPrEh00qthVlBxQ'

      //ładuje stripe
      const stripe = await loadStripe(key);

      //pobieram sessionId z backendu
      const response = await axios.get(`http://localhost:8000/payment/${inputValue}/${walletOwner}`);          
      console.log(response);
      const sessionId = response.data.sessionId;
      
      //przekierowanie do płatności
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
       });
      
      if (error) {    
        console.error('Payment failed:', error);       
        window.location.href = 'http://localhost:8000/payment';
      } else {
       
        window.location.href = 'http://localhost:8000/payment';
      }

      
    }catch (err) {
      console.error('Payment failed:', err);
      
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
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                e.preventDefault();
              }
            }}
          ></input>
          <button className='px-2 ml-4 border border-white rounded-lg text-sm min-w-fit flex justify-center items-center' onClick={makePayment}>
            <i className='fa-solid fa-sack-dollar text-xs'></i>&nbsp;<p>Top up</p>
          </button>
        </div>
        <div className='flex flex-col'>
          <p>Payment methods:</p>
          <div className='flex'>
            <button className='mt-4 py-2 px-4 border border-green-500 border-[#1b1920] rounded-xl shadow-md'>
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
