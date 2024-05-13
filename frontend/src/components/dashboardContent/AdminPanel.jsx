
import React, {useState, useEffect} from 'react'
import {useTheme} from '../../ThemeContext';
import Stars from '../ratingSystem/Stars';

const AdminPanel = ({steamid}) => {

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const renderForm = () => {
        
        if (selectedOption === 'option1') {
            return (
              <div className="flex flex-col items-center justify-center">
                <p className="mt-8 text-2xl text-center">Wyszukaj użytkowników z wybranego zakresu ocen</p><br/>
                <div className="flex items-center justify-center">
                  <p>Od: </p>
                  <Stars />
                </div>
                <div className="flex items-center justify-center">
                  <p>Do: </p>
                  <Stars />
                </div>
                <button className={`font-bold py-2 px-4 rounded mt-4 ${isDarkMode ? 'bg-[#242633]' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
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