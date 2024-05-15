import React, { useContext, useEffect, useState } from 'react';
import '../styles/home.css';
import { useTheme } from '../ThemeContext';
import banner from '../assets/pngs/banner.jpg';
import { useAppState } from '../lib/AppStateManager';
import '../styles/carousel.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../lib/AuthContext';
import Cookies from "js-cookie";
const Home = () => {

    const [selectedCard, setSelectedCard] = useState(1);
    const { isDarkMode } = useTheme();
    const { state, dispatch } = useAppState();

    const { loginUser } = useContext(AuthContext)
    const { user } = useContext(AuthContext)

    const handleCardChange = (cardNumber) => {
        setSelectedCard(cardNumber);
      };

    useEffect(() => {
        console.log(Cookies.get())
        console.log(user)
      // loginUser()
    }, []);

           
  return (
    <>
    <div className={`home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>    
        <div className={`homeContent ${isDarkMode ? 'dark-mode' : 'light-mode'} max-h-fit`}>
            <div className='rightSideContent'> 
                <img src={banner} className='blur-[2px] opacity-80 overflow-hidden min-w-full min-h-full'></img>
                <div className='absolute z-10 top-[40%] left-[30%] text-gray-200'>
                    <p className='drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'><h1>Your safe CS2 market</h1>
                    <p> Shopping, Exchanges, Sells, Withdraws</p></p>
                </div>
            </div>
        </div>
    </div>

    <div className={`aboutUs ${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
        <div className='leftSide'>

            <p> WE WANT TO STAND OUT </p>
            <span class= 'whyUs'> Why CS2 Market </span>

        </div>

        <div className='rightSide'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div>

        
        
    </div>
    <div className={`carousel ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]':'d'}`}> 
        <h1 className="text-xl"> Latest offers</h1>
        <div class="wrapper">
        <div class="container">
            <input type="radio" className="xD" name="slide" id="c1" checked={selectedCard === 1} onChange={() => handleCardChange(1)}/>
            <label for="c1" class="card">
                <div class="row">
                    <div class="icon">1</div>
                    <div class="description">
                        <h4>Winter</h4>
                        <p>Winter has so much to offer -
                         creative activities</p>
                    </div>
                </div>
            </label>
            <input type="radio" name="slide" className="xD" id="c2" checked={selectedCard === 2} onChange={() => handleCardChange(2)} />
            <label for="c2" class="card">
                <div class="row">
                    <div class="icon">2</div>
                    <div class="description">
                        <h4>Digital Technology</h4>
                        <p>Gets better every day -
                         stay tuned</p>
                    </div>
                </div>
            </label>
            <input type="radio" name="slide" className="xD" id="c3" checked={selectedCard === 3} onChange={() => handleCardChange(3)} />
            <label for="c3" class="card">
                <div class="row">
                    <div class="icon">3</div>
                    <div class="description">
                        <h4>Globalization</h4>
                        <p>Help people all over the world</p>
                    </div>
                </div>
            </label>
            <input type="radio" name="slide" className="xD" id="c4" checked={selectedCard === 4} onChange={() => handleCardChange(4)}/>
            <label for="c4" class="card">
                <div class="row">
                    <div class="icon">4</div>
                    <div class="description">
                        <h4>New technologies</h4>
                        <p>Space engineering becomes
                         more and more advanced</p>

                         <Link className='menuLink' to="/UserProfile"> User Profile </Link>
                    </div>
                </div>
            </label>
        </div>
    </div>
        
    </div>
    </>
  );
}

export default Home;
