import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useTheme } from '../../ThemeContext';


const Delivery = ({ownerId}) => {
  
  const { isDarkMode } = useTheme();
  const [waiting, setWaiting] = useState([])
  const [pending, setPending] = useState([])

  
  if (!ownerId) {
    window.location.href = '/'
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:8001/transactionBuyer`, {params: {
        user: ownerId
      }})
      .then((data) => setWaiting(data.data.filter(item => item.isClosed === false)))
      .catch((err) => console.log(err))

      await axios.get(`http://localhost:8001/transactionSeller`, {params: {
        user: ownerId
      }})
      .then((data) => setPending(data.data.filter(item => item.isClosed === false)))
      .catch((err) => console.log(err))
    }
    
    
    fetchData()
    console.log(waiting)
  }, [])

  const handleClosing = (e) => {
    console.log(e.target.value)
    axios.post(`http://localhost:8001/tranactionClose`, {id: e.target.value, status: true})
    .then((res) => {
      setWaiting(prev => prev.filter(item => item._id !== e.target.value))
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={` ${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white' } p-6 rounded-xl mt-2 h-full md:w-2/2 md:ml-6'`} >
      <div className='h-1/2'>
        <h1 className='mb-2'>Pending delivery:</h1>
        {waiting.map((item, index) => (
          <div className='flex flex-col items-center bg-[#18181b] text-white p-4 text-[0.5rem] max-w-fit rounded-xl'>
          <img src={item.item.imageLink} width={100} height={100}></img>
            <p>{item.item.name}</p>
            <button className='text-[0.7rem] mt-2 bg-zinc-700 p-1 rounded-xl ' key={index} value={item._id} onClick={handleClosing}><i class="fa-solid fa-handshake mr-2 " ></i>Confirm</button>
          </div>
          ))}
      </div>
      <div className='mt-2'>
        <h1 className='mb-2'>Waiting to be sent:</h1>
        {pending.map((item, index) => (
          <div className='flex flex-col items-center bg-[#18181b] text-white p-4 text-[0.5rem] max-w-fit rounded-xl'>
          <img src={item.item.imageLink} width={100} height={100}></img>
            <p>{item.item.name}</p>
            <div className='text-[0.7rem] mt-2 p-1 rounded-xl' key={index} value={item._id}><i class="fa-solid fa-box mr-2 "></i>In delivery</div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Delivery
