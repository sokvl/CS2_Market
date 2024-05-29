import React, { useEffect, useState, useContext } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import AuthContext from '../lib/AuthContext';
import { Link, useLocation, useParams  } from 'react-router-dom';
import Spinner from '../components/loadingScene/Spinner';

const UserProfile = () => {

    const { user, dispatch } = useContext(AuthContext)
    const { steam_id } = useParams();
    const { isDarkMode } = useTheme();

    const [profileData, setProfileData] = useState({});
    const [auctionsData, setAuctionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const profileDataRequest = await axios.get(`http://localhost:8000/users/${steam_id}`);
          const auctionsData = await axios.get(`http://localhost:8000/offers/`);
          //const ratingDataRequest = await axios.get(`http://localhost:8000/rating/5`);
          setProfileData(profileDataRequest.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setIsLoading(false);
      }
      fetchData();
    }, [user.steam_id]);
  
    return (
        <>
          <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
            <div className={`w-full rounded-xl max-w-6xl mx-auto p-8 ${isDarkMode ? 'bg-[#18181b] text-white' : 'bg-white text-white'}`}>
              <div className='flex items-center justify-center flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-8'>
                <div className={`${isDarkMode ? 'bg-[#242633]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white'} w-4/5 p-16 rounded-xl`}>
                  {isLoading ? <Spinner /> :
                  <div className="flex items-center justify-center text-sm ">
                    <p className='text-3xl text-zinc-200'> OCENA </p>
                    <img src={profileData.avatar_url} className="mx-8 rounded-full border bg-black" width={200} height={200} alt="User Avatar" />
                      <p className="text-3xl text-zinc-200">{profileData.username}</p>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
         
        </>
      );
    };
    
    export default UserProfile;