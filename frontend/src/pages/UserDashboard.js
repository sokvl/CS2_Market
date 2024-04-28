import React, { useContext, useEffect, useState } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { useAppState } from '../lib/AppStateManager';
import { Link, useLocation } from 'react-router-dom';
import Inventory from '../components/dashboardContent/Inventory';
import WalletManagment from '../components/dashboardContent/WalletManagment';
import Settings from '../components/dashboardContent/Settings';
import UserOffers from '../components/dashboardContent/Offers';
import Delivery from '../components/dashboardContent/Delivery';
import AuthContext from '../lib/AuthContext';

const UserDashboard = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { state, dispatch } = useAppState();

  const { user } = useContext(AuthContext)

  const [profileData, setprofileData] = useState({});

  useEffect(() => {

  }, [state.user.steamid]);

  const getLinkClassName = (pathname) => {
    return `flex items-center py-1 rounded-md ${location.pathname === pathname ? 'border-b border-white' : ''}`;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
      <div className={`w-full rounded-xl max-w-6xl mx-auto p-8 ${isDarkMode ? 'bg-[#18181b] text-white' : 'bg-white text-white'}`}>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-24'>
          <div className={`${isDarkMode ? 'bg-[#242633]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white'} md:w-1/4 p-4 rounded-xl`}>
            <div className="flex flex-col text-sm items-center justify-center">
              <img src={user.avatar} className="rounded-full border bg-black" width={96} height={96} alt="User Avatar" />
              <h1 className="text-2xl mt-2">{profileData.username}</h1>
            </div>
            <div className='text-md mt-4'>
              <p className="text-sm text-zinc-400 mb-2">Menu</p>
              <div className="flex flex-col">
                <Link to={'/UserDashboard/Settings'} className={getLinkClassName('/UserDashboard/Settings')}>
                  <i className="fa-solid fa-gear p-2"></i>
                  <p className='p-1'>Settings</p>
                </Link>
                <Link to={'/UserDashboard/Inventory'} className={getLinkClassName('/UserDashboard/Inventory')}>
                  <i className="fa-solid fa-briefcase p-2"></i>
                  <p className='p-1'>Inventory</p>
                </Link>
                <Link to={'/UserDashboard/Wallet'} className={getLinkClassName('/UserDashboard/Wallet')}>
                  <i className="fa-solid fa-wallet p-2 "></i>
                  <p className='p-1'>Wallet</p>
                </Link>
                <Link to={'/UserDashboard/ActiveOffers'} className={getLinkClassName('/UserDashboard/ActiveOffers')}>
                  <i className="fa-solid fa-money-bill p-2"></i>
                  <p className='p-1'>Active offers</p>
                </Link>
                <Link to={'/UserDashboard/Delivery'} className={getLinkClassName('/UserDashboard/Delivery')}>
                  <i className="fa-solid fa-truck p-2"></i>
                  <p className='p-1'>Delivery</p>
                </Link>
              </div>
            </div>
          </div>
          <div className='md:w-3/4'>
            {location.pathname === '/UserDashboard/Settings' ? <Settings tl={"TODO"} steamid={user.steam_id}/> : <></>}           
            {location.pathname === '/UserDashboard/Inventory' ? <Inventory /> : <></>}
            {location.pathname === '/UserDashboard/Wallet' ? <WalletManagment walletOwner={user.steam_id} balance={12}/> : <></>}
            {location.pathname === '/UserDashboard/ActiveOffers' ? <UserOffers creatorId={user.steam_id}></UserOffers> : <></>}
            {location.pathname === '/UserDashboard/Delivery' ? <Delivery ownerId={user.steam_id}/> : <></>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
