import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {HiMenuAlt3} from 'react-icons/hi';
import '../styles/contact.css';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { Auction } from '../components/index';
import Spinner from '../components/loadingScene/Spinner';

Modal.setAppElement('#root'); 

export default function Market() {
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [displayItems, setdisplayItems] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const [catfilters, setcatFilters] = useState([]);
  const [condFilters, setcondFilters] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  let checkBoxState = [true, true,true,true,true,true,true,true,true,true,true,true,true,true,true]

  const [offers, setOffers] = useState([]);
  const [itemName, setItemName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  const fetchData = async () => {
    try {
      setIsLoading(true);

      const categoriesParam = selectedCategories.join(',');
      const conditionsParam = selectedConditions.join(',');
      const dataResponse = await axios.get(`http://localhost:8000/offers/?item_category=${categoriesParam}&price_min=${minPrice}&price_max=${maxPrice}&item_condition=${conditionsParam}&item_name=${itemName}`);
      const auctionsData = dataResponse.data;
      console.log(auctionsData)

      setOffers(auctionsData);
      setItems(auctionsData);
      setdisplayItems(auctionsData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleFilter = () => {
    fetchData();
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const openModal = (auction) => {
    setSelectedAuction(auction);
  };

  const closeModal = () => {
    setSelectedAuction(null);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    }
  };

  const handleConditionChange = (event) => {
    const condition = event.target.value;
    if (event.target.checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter((con) => con !== condition));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [open, setOpen] = useState(true);
  const categories = [ 'pistol', 'rifle', 'smg', 'sniper rifle', 'shotgun', 'knife', 'gloves', 'agent', 'sticker', 'container'];
  const conditions = [ 'fn', 'mw', 'ft', 'ww', 'bs'];

  return (
    <>
      <div class={`flex mt-8 min-h-screen flex-row ${isDarkMode ? 'bg-gradient-to-r from-[#121212] via-[#04101A] to-[#1a1625]' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'} overflow-hidden max-h-[100vh]`}>      
          <div className={`${isDarkMode ? 'bg-[#0e0e0e] text-white': ' bg-white' } min-h-screen px-4 ${open ? 'w-72 overflow-y-auto': 'w-16' } transition-all duration-300 ease-in-out`}>
              <div className='py-3 flex justify-end'>
                <HiMenuAlt3 className={`text-2xl mr-4 cursor-pointer ${isDarkMode ? 'text-white' : 'text-blue-700'}`} onClick={() => setOpen(!open)} />
              </div>
              
            <div className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}> 
              <div className='mt-8'>
                <h1 className='text-xl text-center'> Name </h1>
                <input type='text' className='mt-4 w-full p-2 text-black text-center' value={itemName} onChange={handleItemNameChange} placeholder='Item name'/>
               
                <h1 className='text-xl text-center mt-4 pb-2'> Price </h1>
                  <div className='flex justify-center text-2xl p-2'>
                    <input type='number' className='w-1/2 p-2 text-black text-center' onChange={handleMinPriceChange} value={minPrice} placeholder='min price'/>
                    <input type='number' className='w-1/2 p-2 text-black text-center' onChange={handleMaxPriceChange} value={maxPrice}placeholder='max price'/>
                    
                  </div>
                <hr className='py-4'/>
                <h1 className='text-xl text-center pb-2'>Pick category </h1>
                <div className="space-y-2 text-sm">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category}
                        className="h-4 w-4 text-indigo-800 transition duration-150 ease-in-out"
                        onChange={handleCategoryChange}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div> 
                <hr className='py-4 mt-4'/>      
                <h1 className='text-xl text-center pb-2'>Select condition </h1>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={condition}
                        className="h-4 w-4 text-indigo-800 transition duration-150 ease-in-out "
                        onChange={handleConditionChange}
                      />
                      <span className='text-l'>{condition}</span>
                    </label>
                  ))}
                </div>            
                <hr className='py-4 mt-4'/>
                <div className='text-center'>
                  <button className='bg-blue-800 text-white p-2 rounded-md' onClick={handleFilter}>Filter</button>
                </div>
              </div>
            </div>
          </div>      
        <div class="w-5/6 p-8 lg:h-auto overflow-auto">
          {isLoading ? <Spinner /> :
            <div className='flex flex-wrap'>      
              {displayItems.map((auction, i) => (
                <div key={i} className='min-w-fit'>
                  <Auction 
                    id={auction.item.item_id} 
                    title={auction.item.item_name} 
                    image={auction.item.img_link} 
                    price={auction.price}  
                    owner={auction.owner} 
                    inspectLink={auction.item.inspect == null ? "none" : auction.item.inspect}
                    stickerElement={auction.item.stickerstring}
                    isOwnOffer={false}
                    rarityColor={auction.item.rarity}
                    offerActiveId={auction.offer_id}
                    condition={auction.item.condition}
                  />
                </div>
              ))}
            </div>
            }
        </div>
      </div>

      <Modal isOpen={!!selectedAuction} onRequestClose={closeModal}style={{overlay: {backdropFilter: 'blur(8px)', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.3)'}, content: {margin:'auto', width: '50%',border:'none' ,height: '610px',top:'50px',backgroundColor: 'rgba(0, 0, 0, 0.0001)',overflow:'hidden'} }}>
        {selectedAuction && (
          <div className={`flex w-full h-full ${isDarkMode ? 'bg-neutral-700 text-white' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
                <div className="container mx-auto">
                    <div className={`text-center text-3xl p-4 ${isDarkMode ? 'bg-zinc-800':'bg-white text-blue-800'}`}>
                        <h1><b>Item details</b></h1>
                    </div>
                    <div className="lg:flex">

                        <div className="flex flex-col w-full lg:w-1/2 p-4 items-center justify-center mb-20">
                            <img src = {selectedAuction.item.imageLink} className='w-[180px] h-[180px]'/>
                            <p className='text-2xl text-zinc-200'>{selectedAuction.item.name} </p>
                            <a href="#_" class="mt-12 inline-flex hover:-translate-y-1 items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">
                                 Inspect in game
                            </a>
                        </div>

                        <div className={`flex flex-col w-full lg:w-1/2 items-center justify-center ${isDarkMode ? 'bg-neutral-700 text-white':'text-white'}`}>
                            <p className='text-xl'><b>Condition:</b> {selectedAuction.item.condition}</p>
                            <p className='text-xl pt-8'><b>Float:</b></p>
                            <p className='pt-8 text-xl'> <b>Price:</b> {selectedAuction.price}$ </p>
                            <p className='pt-8 text-xl'><b> Suggested price:</b> {selectedAuction.price}$ </p> 
                        </div>
                    </div>
                    <div className={`text-center p-4 text-3xl ${isDarkMode ? 'bg-zinc-800' : 'bg-white text-blue-800' }`}>
                            <a href="#_" class={`no-underline align-middle transition-all duration-300 ease-in-out bg-transparent inline-flex hover:-translate-y-2 items-center justify-center h-16 px-10 py-0 text-2xl font-semibold rounded-full cursor-pointer select-none focus:no-underline text-center${isDarkMode ? 'text-gray-200 hover:text-green-400':'border border-solid border-blue-800 hover:text-green-500' }`}>
                                 Buy now!
                            </a>
                    </div>
                </div>
          </div>
        )}
      </Modal>
    </>
  );
}
