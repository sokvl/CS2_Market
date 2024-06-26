
import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import {useTheme} from '../../ThemeContext';
import AuthContext from '../../lib/AuthContext';


const Settings = ({tl, steamid}) => {

    const { isDarkMode } = useTheme();
    const [inputValue, setinputValue] = useState("")
    const [notifications, setNotifications] = useState([])
    const [reloadState, setreloadState] = useState(false);
    let color = "#FFFFFF"
    const { user } = useContext(AuthContext);
    
        
    useEffect(() => {
        if (!user) {
            window.location.href = '/'
        }
    }, [])
    

    const inputHandler = (e) => {
        setinputValue(e.target.value);
    }



    function isValidSteamTradeLink(tradeLink) {
        // Define a regex pattern to match valid Steam trade links
        const steamTradeLinkRegex = /^(https?:\/\/)?(www\.)?steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[A-Za-z0-9_-]+$/;
      
        // Use the test method to check if the tradeLink matches the regex pattern
        return steamTradeLinkRegex.test(tradeLink);
      }

    const setTradelink = () => {
        if (isValidSteamTradeLink(inputValue)) {
            axios.patch(`http://localhost:8000/users/${steamid}/`, {steam_tradelink: inputValue})
            .then((res) => 
            {
                setreloadState(prev => !prev);
                document.querySelector('.info').innerHTML = "Tradelink successfully assigned!"
            })
            .catch(err => document.querySelector('.info').innerHTML = "Oops! Try again")
        } else {
            document.querySelector('.info').innerHTML = "Provide correct link!"
        }
    }
 
    return (
        <>
         
            <div className={` ${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white' } p-6 rounded-xl mt-2 h-full md:w-2/2 md:ml-6'`} key={reloadState}>
                <p className='mb-4 text-3xl text-center'> Settings </p>
                <p className='text-xl mb-2'> Tradelink </p>
                <div className='flex-col'>              
                    <input 
                        placeholder={tl ? tl : "Please provide tradelink!"}
                        type='text' 
                        className={` ${isDarkMode ? 'bg-[#292730]' : 'text-blue-600'} rounded-xl  shadow-black shadow-inner border-2 border-[${color}] w-full`}
                        onChange={inputHandler}
                        />
                    <button className={`  ${isDarkMode ? 'bg-[#292730]' : 'bg-white text-blue-700'} p-2 rounded-lg text-xl font-bold min-w-fit flex justify-center items-center mt-2`} onClick={setTradelink}> Save </button>
                </div>
                <p className='info mt-2 text-red-400 font-bold'></p>
            </div>
            
        </>
    );
}
export default Settings