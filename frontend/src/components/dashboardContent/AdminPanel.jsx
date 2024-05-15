
import React, {useState, useEffect} from 'react'
import {useTheme} from '../../ThemeContext';
import Stars from '../ratingSystem/Stars';
import axios from 'axios';
import '../../styles/adminPanel.css';

const AdminPanel = ({steamid}) => {

    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState('option1');
    const [selectedStars, setSelectedStars] = useState(0);
    const [selectedStars2, setSelectedStars2] = useState(0);

    const [data, setData] = useState([]);
    
    const handleStarChange = (stars, whichStar) => {
      if (whichStar === 1) setSelectedStars(stars);
      else setSelectedStars2(stars);
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleRaportGenerate = () => {
      if(selectedStars > selectedStars2 && selectedStars2 === 0) {
        alert('Zakres ocen jest niepoprawny');
        return;
      } 
        axios.get(`http://localhost:8000/reports/rating/?min_rating=${selectedStars}&max_rating=${selectedStars2}`)
       .then((response) => {
          
          setData(response.data);
          console.log(data);
          setShowPopup(true);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            
          }, 3000); 
          
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
       });

    }


      const renderForm = () => {
        
        if (selectedOption === 'option1') {

            return (
              <div className="flex flex-col items-center justify-center">
                <p className="mt-8 text-2xl text-center">Wyszukaj użytkowników z wybranego zakresu ocen</p><br/>
                <div className="flex items-center justify-center">
                  <p>Od: </p>
                  <Stars onStarChange={(stars) => handleStarChange(stars, 1)} />
                </div>
                <div className="flex items-center justify-center">
                  <p>Do: </p>
                  <Stars onStarChange={(stars) => handleStarChange(stars, 2)} />
                </div>
                <button onClick={handleRaportGenerate} className={`font-bold py-2 px-4 rounded mt-4 ${isDarkMode ? 'bg-[#242633]' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
                  Wygeneruj raport
                </button>
              </div>
            );
          }
          else if (selectedOption === 'option2') {
          return (
            <div className="flex flex-col items-center justify-center">
                <p className="mt-8 text-2xl text-center">Raport 2</p><br/>
                <form class="block w-96 items-center justify-center shadow-lg p-4 rounded-xl">

                    <div class="grid grid-cols-2 gap-4">
                        <div class="relative z-0 w-full mb-5">
                        <input type="text" name="dd" placeholder="price min:" class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-gray-200 font-sans" />
                        <label for="dd" class="absolute duration-200 top-3 -z-1 origin-0 text-gray-500 text-base"></label>
                        </div>
                        <div class="relative z-0 w-full mb-5">
                        <input type="text" name="mm" placeholder="price max:" class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-gray-200 font-sans" />
                        <label for="mm" class="absolute duration-200 top-3 -z-1 origin-0 text-gray-500 text-base"></label>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="relative z-0 w-full mb-5">
                        <input type="date" name="dd" placeholder="od: " class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-gray-200 font-sans" />
                        <label for="dd" class="absolute duration-200 top-3 -z-1 origin-0 text-gray-500 text-base"></label>
                        </div>
                        <div class="relative z-0 w-full mb-5">
                        <input type="date" name="mm" placeholder="do: " class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-gray-200 font-sans" />
                        <label for="mm" class="absolute duration-200 top-3 -z-1 origin-0 text-gray-500 text-base"></label>
                        </div>
                    </div>
                    
                    <div class="relative z-0 w-full mb-5">

                        <select id="category" name="category" class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:bg-transparent focus:border-indigo-600 border-gray-200 font-sans">
                            <option value="" defaultChecked>Pick category</option>
                            <option value="all" >All</option>
                            <option value="food">Knives</option>
                            <option value="clothing">Rifles</option>
                            <option value="electronics">Sniper Rifles</option>
                            <option value="electronics">Pistols </option>
                            <option value="electronics">SMG </option>
                            <option value="electronics">Shotguns </option>
                            <option value="electronics">Machine Guns </option>
                            <option value="electronics">Containers </option>
                            <option value="electronics">Gloves </option>
                            <option value="electronics">Agents </option>
                        </select>
                    </div>
                    
                    <button className={`font-bold py-2 px-4 rounded mt-4 ${isDarkMode ? 'bg-[#242633]' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
                        Wygeneruj raport
                    </button>
                </form>
            </div>
          );
        }
      };  

    const { isDarkMode } = useTheme();

    return (
        <>
     
         <div className={`${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white' } p-6 rounded-xl mt-2 h-full md:w-2/2 md:ml-6'`}>
            <p className='mb-4 text-3xl text-center'> Admin Panel </p>

            {showPopup && (
              <>
                <div className="overlay" onClick={() => setShowPopup(false)}></div>
                  <div className="popUp">
                    {isLoading ? (
                      <>
                        <h1 className='text-3xl text-center'> Raport is generating, wait a second please ... </h1>
                        <div className="loading">Loading&#8230;</div> 
                      </>
                    ) : (
                      <>
                        <h1 className='text-3xl text-center mb-4'> Raport results</h1>
                        <p className='text-xl text-center'>Users with rating between {selectedStars} and {selectedStars2} <i className="fa-solid fa-star "></i></p>
                        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                          {data.map((user) => (
                            <div key={user.id} className="bg-[#242633] p-4 rounded-xl w-full sm:w-auto">
                              <img src={user.avatar_url} width='100%' height='100%'
                                className="rounded-full border bg-black" alt="User Avatar"
                              />                
                              <p className='mt-4 text-center text-xl'>{user.username}</p>
                              <p className='mt-4 text-center text-sm'>Average rating:</p>
                              <p className='mt-1 text-center text-md'>{user.average_rating} / 5.00</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                  </div>
              </>
            )}


            <div className="grid w-[20rem] grid-cols-2 gap-2 rounded-xl text-black bg-gray-200 p-2 mx-auto items-center justify-center">
                <div>
                    <input type="radio" checked={selectedOption === 'option1'} id="1" onChange={handleRadioChange}  name="option" value="option1" className="peer hidden" />
                    <label htmlFor="1" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Raport 1</label>
                </div>

                <div>
                    <input type="radio" checked={selectedOption === 'option2'} id="2" onChange={handleRadioChange} name="option" value="option2" className="peer hidden" />
                    <label htmlFor="2" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Raport 2</label>
                </div>                        
            </div>   
            {renderForm()}       
         </div>
            
        </>
    );
}
export default AdminPanel