import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import AuthContext from '../../lib/AuthContext';

const LoginButton = () => {
  const { isDarkMode } = useTheme();
  const { user } = useContext(AuthContext)

    const handleClick = () => {
        console.log(user)
    }

  return (
    <div className='text-[14px]'>
        {!user ? 
        
        <a href='http://localhost:8000/login'>
            <div className={`rounded-xl p-1 px-2 flex text items-center hover:cursor-pointer ${isDarkMode ? 'bg-[#2f2b3a] text-gray-200' : 'border-2 border-blue-500'}`}> 
                    <div className='flex items-center'>
                        <p className='mr-2'>Login</p> <i class="fa-brands fa-steam"></i> 
                    </div>
            </div> 
        </a>        
        :
        <Link to="/UserDashboard/Settings">
            <div className={`rounded-xl p-1 px-2 mx-4 flex items-center hover:cursor-pointer ${isDarkMode ? 'bg-[#2f2b3a] text-gray-200' : 'border-2 border-blue-500'}`}> 
                <div className='flex items-center text-xl'>
                    <img src={user.avatar} width={42} height={42} className='rounded-[100%]'></img>
                    <span className='mx-4'>{user.nickname}</span>
                </div> 
            </div>  
        </Link>}
    </div>
  );
}

export default LoginButton;
