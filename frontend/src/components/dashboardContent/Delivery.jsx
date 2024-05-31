import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import Spinner from '../../components/loadingScene/Spinner';
import AuthContext from '../../lib/AuthContext';

const Delivery = ({ ownerId }) => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [waiting, setWaiting] = useState([]);
  const [pending, setPending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let data = await axios.get(`http://localhost:8000/transactions/user-transactions?steam_id=${user.steam_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      console.log(data.data.to_send);
      setPending(data.data.to_send);
      setWaiting(data.data.waiting_to_get);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClosing = async (transactionId) => {
    try {
      await axios.post(`http://localhost:8000/transactions/${transactionId}/close_offer/`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={` ${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white'} p-6 rounded-xl mt-2 h-auto md:w-2/2 md:ml-6`}>
            <div className='h-1/2 mb-8'>
              <h1 className='mb-2 text-xl font-bold'>Receive your items:</h1>
              <div className='grid grid-cols-3 gap-10'>
                {waiting.map((item, index) => (
                  <div key={index} className='flex flex-col items-center bg-[#18181b] text-white p-4 text-[0.5rem] w-60 h-42 rounded-xl'>
                    <img src={item.item_image} width={120} height={120} className="mb-2 transform transition duration-300 hover:scale-[150%] hover:z-50" />
                    <p className='text-sm'>{item.item_name}</p>
                    <button className='transform transition duration-300 hover:scale-[120%] text-[0.7rem] mt-2 bg-zinc-700 p-1 rounded-xl' onClick={() => handleClosing(item.transaction_id)}>
                      <i className="fa-solid fa-handshake mr-2"></i>Confirm
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-2 h-1/2'>
              <h1 className='mb-2 text-xl font-bold'>U have to send those items:</h1>
              <div className='flex flex-wrap'>
                {pending.map((item, i) => (
                  <div key={i} className='w-full'>
                    <div className='bg-[#18181b] text-white rounded-xl w-full mb-2 flex flex-col items-center justify-center p-4'>
                      <img src={item.item_image} width={120} height={120} className="mb-2" />
                      <p className='mb-8 border-t-2'>{item.item_name}</p>
                      <h1 className='justify-start font-bold'>Send it here:</h1>
                      <h2>{item.buyer_tradelink}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Delivery;
