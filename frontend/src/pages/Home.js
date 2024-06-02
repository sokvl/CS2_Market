import React, { useContext, useEffect, useState } from 'react';
import '../styles/home.css';
import { useTheme } from '../ThemeContext';
import banner from '../assets/pngs/banner.jpg';
import '../styles/carousel.css';
import axios from 'axios';
import AuthContext from '../lib/AuthContext';

const Home = () => {

    const [offers, setOffers] = useState([]);
    const [selectedCard, setSelectedCard] = useState(1);

    const { isDarkMode } = useTheme();

    const { user } = useContext(AuthContext)

    const handleCardChange = (cardIndex) => {
        setSelectedCard(cardIndex);
    };

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/offers/");
                const shuffledOffers = response.data.sort(() => 0.5 - Math.random());
                setOffers(shuffledOffers.slice(0, 4));
            } catch (error) {
                console.log("Error fetching offers:", error);
            }
        };

        fetchOffers();
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
    <div className={`carousel ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'd'}`}>
            <h1 className="text-xl">Random offers</h1>
            <div className="wrapper">
                <div className="container">
                    {offers.length > 0 && (
                        <>
                            <input type="radio" className="xD" name="slide" id="c1" checked={selectedCard === 1} onChange={() => handleCardChange(1)} />                     
                            <label htmlFor="c1" className="card" style={{ backgroundImage: `url(${offers[0].item.img_link})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid #fff' }}>    
                                <div className="row">                  
                                    <div className="icon">1</div>
                                    <div className="description">
                                        <h4>{offers[0].item.item_name}</h4>
                                        <p>{offers[0].item.description}</p>
                                    </div>
                                </div>
                            </label>

                            <input type="radio" name="slide" className="xD" id="c2" checked={selectedCard === 2} onChange={() => handleCardChange(2)} />
                            <label htmlFor="c2" className="card" style={{ backgroundImage: `url(${offers[1].item.img_link})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid #fff' }}>    
                                <div className="row">
                                    <div className="icon">2</div>
                                    <div className="description">
                                        <h4>{offers[1].item.item_name}</h4>
                                        <p>{offers[1].item.description}</p>
                                    </div>
                                </div>
                            </label>

                            <input type="radio" name="slide" className="xD" id="c3" checked={selectedCard === 3} onChange={() => handleCardChange(3)} />
                            <label htmlFor="c3" className="card" style={{ backgroundImage: `url(${offers[2].item.img_link})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid #fff' }}>    
                                <div className="row">
                                    <div className="icon">3</div>
                                    <div className="description">
                                        <h4>{offers[2].item.item_name}</h4>
                                        <p>{offers[2].item.description}</p>
                                    </div>
                                </div>
                            </label>

                            <input type="radio" name="slide" className="xD" id="c4" checked={selectedCard === 4} onChange={() => handleCardChange(4)} />
                            <label htmlFor="c4" className="card" style={{ backgroundImage: `url(${offers[3].item.img_link})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid #fff' }}>    
                                <div className="row">
                                    <div className="icon">4</div>
                                    <div className="description">
                                        <h4>{offers[3].item.item_name}</h4>
                                        <p>{offers[3].item.description}</p>
                                        
                                    </div>
                                </div>
                            </label>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
  );
}

export default Home;
