import React, {useState, useEffect} from 'react'
import { useAppState } from '../../lib/AppStateManager';
import { useTheme } from '../../ThemeContext';
import axios from 'axios';


const Wallet = () => {

  const { isDarkMode } = useTheme();
  const { state } = useAppState();
  const balance = 0;

  const [hidden, setHidden] = useState(true)
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    await axios.post('http://localhost:8001/notifications', {owner: state.user.steamid})
      .then(
        res => setNotifications(res.data)
      ).catch((err) => console.log(err))
  }
  
  

  const handleNotf = () => {
    fetchNotifications()
    setHidden(prev => !prev)
  }

    return (
      <>    
      {state.user.isSet ? 
        <div className={``}> 
          <div className="flex flex-row items-center justify-center ">
            <i class={`fa-solid fa-bell text-zinc-500 hover:cursor-pointer ${notifications.length > 0 ? 'animate-bounce' : '' }`} onClick={handleNotf}></i>&nbsp;
          </div>
          <div className={`absolute z-[999] max-w-[18rem] min-h-[20rem] bg-zinc-800 border-2 border-teal-950	 rounded-xl p-2 shadow-xl ${hidden ? 'hidden' : ''} transition all`}>
            <p className='text-center border-b py-1'>Notifications</p>
            {notifications.map((item, i) => (
              <div key={i} className="p-2 burder-dashed border-b my-2 overflow-auto	text-sm">
                <p>{item.message}</p>
              </div>
            )) }
          </div>
        </div>
        :
        <div></div>
      }
      </>
  )
}

export default Wallet
