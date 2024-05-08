import React, { useEffect, useState, useContext } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import AuthContext from '../../lib/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

const UserProfile = () => {

    const { user, dispatch } = useContext(AuthContext)

    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [profileData, setProfileData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    useEffect(() => {
      if (!user) {
        axios.get("http://localhost:8001/api/auth/check", {
          withCredentials: true
        }).then((res) => {
          const user = {
            steamid: res.data.user.loggedUser.steamId,
            avatar: res.data.user.loggedUser.avatarLink,
            nickname: res.data.user.loggedUser.username,
            isSet: true
          }
          dispatch({ type: 'RESET_STATE' });
          dispatch({ type: 'ASSIGN_USER', payload: { ...user } });
        }).catch((err) => {
          console.log(err);
        })
      }
      const fetchData = async () => {
        try {
          const profileDataRequest = await axios.get(`http://localhost:8001/users/${user.steam_id}`);
          setProfileData(profileDataRequest.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [user.steam_id]);
  
    const handleFlagIconClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
        <>
          <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
            <div className={`w-full rounded-xl max-w-6xl mx-auto p-8 ${isDarkMode ? 'bg-[#18181b] text-white' : 'bg-white text-white'}`}>
              <div className='flex items-center justify-center flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-16'>
                <div className={`${isDarkMode ? 'bg-[#242633]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white'} w-3/5 p-4 rounded-xl`}>
                  <div className="flex flex-row text-sm items-center justify-center">
                    <img src={profileData.avatarLink} className="mr-8 rounded-full border bg-black" width={200} height={200} alt="User Avatar" />
                    <i className="fa-solid fa-flag fa-2xl" onClick={handleFlagIconClick}></i>
                    <h1 className="text-2xl mt-2"></h1>
                  </div>
                  <div className='text-md mt-4'>
                    <center><p className="text-3xl  text-zinc-200 mb-2">{profileData.username}</p></center>
                  </div>
                  <div className='flex flex-row p-12 space-x-12 items-center justify-center'>
                    <i className="fa-solid fa-thumbs-up fa-2xl"></i>
                    <div className={`${isDarkMode ? 'bg-zinc-900' : ''} w-32 h-32 rounded-xl text-center pt-8`}>OCENA</div>
                    <i className="fa-solid fa-thumbs-down fa-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Example Modal"
            style={{overlay: {backdropFilter: 'blur(8px)', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.3)'}, content: {margin:'auto', width: '35%',border:'none' ,height: '420px',top:'50px',backgroundColor: 'rgba(0, 0, 0, 0.0001)',overflow:'hidden'} }}>
            <div className={`flex rounded-3xl w-full h-full ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>                  
                <div className='flex flex-col w-full p-4 mb-20'>
                    <p className='text-2xl mx-auto pt-4 mb-8'><b> Zgłoś użytkownika </b></p> 
                    <div>
                        <ul className='space-y-4 ml-4'>
                            <li>
                                <input type="radio" id="reason1" name="reason" value="Naruszenie regulaminu" style={{ transform: 'scale(1.2)' }} />
                                <label htmlFor="reason1" style={{ marginLeft: '8px' }}>Oszustwo</label>
                            </li>
                            <li>
                                <input type="radio" id="reason2" name="reason" value="Nieodpowiednia treść" style={{ transform: 'scale(1.2)' }} />
                                <label htmlFor="reason2" style={{ marginLeft: '8px' }}>Nielegalne działania</label>
                            </li>
                            <li>
                                <input type="radio" id="reason3" name="reason" value="Inne" style={{ transform: 'scale(1.2)' }} />
                                <label htmlFor="reason3" style={{ marginLeft: '8px' }}>Spam</label>
                            </li>
                            <li>
                                <input type="radio" id="reason3" name="reason" value="Inne" style={{ transform: 'scale(1.2)' }} />
                                <label htmlFor="reason3" style={{ marginLeft: '8px' }}>Fałszywe dane</label>
                            </li>
                            <li>
                                <input type="radio" id="reason3" name="reason" value="Inne" style={{ transform: 'scale(1.2)' }} />
                                <label htmlFor="reason3" style={{ marginLeft: '8px' }}>Toksyczne zachowanie</label>
                            </li>
                        </ul>
                    </div>
                    <button onClick={handleCloseModal} className='p-4 mb-2 mt-4 w-1/3 mx-auto rounded-md bg-[#16121f] border-b-2 border-[#2a2635]'>
                        Wyślij zgłoszenie
                    </button>
                </div>          
            </div>
          </Modal>
        </>
      );
    };
    
    export default UserProfile;