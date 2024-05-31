import React, {useState,useContext,useEffect } from 'react'
import AuthContext from '../../lib/AuthContext';
import { useTheme } from '../../ThemeContext';
import axios from 'axios';


const Notifications = () => {

  const { user } = useContext(AuthContext)

  const { isDarkMode } = useTheme();
  const [hidden, setHidden] = useState(true)
  const [notifications, setNotifications] = useState([]);

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/transactions/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      fetchNotifications(); 
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      let data = await axios.get(`http://localhost:8000/transactions/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      setNotifications(data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
     
    fetchNotifications();
  }, []);
  
  const handleNotf = async () => { 
    await fetchNotifications();
    setHidden(prev => !prev);
  };

    return (
      <>    
      {user ? 
        <div className={``}> 
          <div className="flex flex-row items-center justify-center ">
            <i class={`fa-solid fa-bell text-zinc-500 hover:cursor-pointer ${notifications.length > 0 ? 'animate-bounce' : '' }`} onClick={handleNotf}></i>&nbsp;
          </div>
          <div className={`absolute overflow-scroll z-[999] max-w-[18rem] max-h-[20rem] min-h-[20rem] bg-zinc-800 top-24 rounded-xl p-2 shadow-2xl ${hidden ? 'hidden' : ''} transition all`}>
            <h1 className='text-center text-xl border-b p-2'>Notifications</h1>
            {notifications.length === 0 ? 
            (
              <p className='p-4'>You have 0 notifications</p>
            ) 
            : 
            (         
              notifications.map((item) => (
                <div key={item.notification_id} className="p-2 border-dashed border-b my-2 overflow-auto text-sm">
                  <p
                    onClick={() => handleDeleteNotification(item.notification_id)}
                    className='flex text-red-400 justify-end text-xs hover:cursor-pointer'
                  >
                    X
                  </p>
                  <p>{item.message}</p>

                </div>
              ))
            )}
          </div>
        </div>
        :
        <div></div>
      }
      </>
  )
}

export default Notifications
