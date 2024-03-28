import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {HiMenuAlt3} from 'react-icons/hi';
import '../styles/contact.css';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { Auction } from '../components/index';


Modal.setAppElement('#root'); 

export default function Market() {
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [displayItems, setdisplayItems] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const [catfilters, setcatFilters] = useState([]);
  const [condFilters, setcondFilters] = useState([]);

  const [isSet, setisSet] = useState(false);

  let checkBoxState = [true, true,true,true,true,true,true,true,true,true,true,true,true,true,true]

  const fetchData = async () => {
    try {
      const dataResponse = await axios.get('http://localhost:8001/offers/');
      const auctionsData = dataResponse.data;
      const filteredData = auctionsData.filter(item => item.isActive === true);
      setItems(filteredData);
      setdisplayItems(filteredData)
      setisSet(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortAscending = () => {
    const sortedItems = [...displayItems].sort((a, b) => a.price - b.price);
    setdisplayItems(sortedItems);
  };

  const sortDescending = () => {
    const sortedItems = [...displayItems].sort((a, b) => b.price - a.price);
    setdisplayItems(sortedItems);
  };

  const filterItems = () => {
    // Przykład filtrowania: zwróć elementy, które są zawarte w condFilters
    const filteredItems = items.filter(item => !catfilters.includes(item.item.category));
    const sf = filteredItems.filter(item => !condFilters.includes(item.item.condition))
    setdisplayItems(sf);
    console.log("displayed", displayItems)
  };

  const filterConditions = () => {
    const filteredItems = items.filter(item => !condFilters.includes(item.item.condition));
    setdisplayItems(filteredItems);
    console.log(displayItems)
  }

  const openModal = (auction) => {
    setSelectedAuction(auction);
  };

  const closeModal = () => {
    setSelectedAuction(null);
  };

  const hanldeChangeCategory = (e) => {
    if(catfilters.includes(e.target.value)) {
      setcatFilters([...categories])
      setcatFilters(catfilters.filter(filter => filter != e.target.value))
      console.log(catfilters)
    } else {
      setcatFilters([...catfilters, e.target.value.toLowerCase()])
      console.log(catfilters)
    }
    filterItems()
  }

  const hanldeChange = (e) => {
    if(condFilters.includes(e.target.value)) {
      setcondFilters([...conditions])
      setcondFilters(condFilters.filter(filter => filter != e.target.value))
      console.log(condFilters)
    } else {
      setcondFilters([...condFilters, e.target.value])
      console.log(condFilters)
    }
  }

  

  useEffect(() => {
    if(!isSet) {
      fetchData()
      //setcondFilters([...conditions])
      //setcatFilters([...categories])
    }
   // filterConditions();
    filterItems()
  }, [condFilters, catfilters]);


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
              <div className=' mt-12'>
                
                <h1 className='text-xl text-center pb-2'> Price </h1>
                  <div className='flex justify-center text-2xl p-2'>
                    <button onClick={sortDescending}>
                      <i class="fa-solid fa-arrow-down-short-wide mr-4 hover:cursor-pointer" ></i>
                    </button>
                    <button onClick={sortAscending}>
                    <i class="fa-solid fa-arrow-up-short-wide ml-4 hover:cursor-pointer" ></i>
                    </button>
                  </div>
                <hr className='py-4'/>
                <h1 className='text-xl text-center pb-2'>Without category </h1>
                <div className="space-y-2 text-sm">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category}
                        className="h-4 w-4 text-indigo-800 transition duration-150 ease-in-out"
                        onChange={hanldeChangeCategory}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div> 
                <hr className='py-4 mt-4'/>      
                <h1 className='text-xl text-center pb-2'>Without condition </h1>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={condition}
                        className="h-4 w-4 text-indigo-800 transition duration-150 ease-in-out "
                        onChange={hanldeChange}
                      />
                      <span className='text-l'>{condition}</span>
                    </label>
                  ))}
                </div>   
                <hr className='py-4 mt-4'/>  
              </div>
            </div>
          </div>      
        <div class="w-5/6 p-8 lg:h-auto overflow-auto">
          <div className='flex flex-wrap'>      
            {displayItems.map((auction, i) => (
              <div key={i} className='min-w-fit'>
                <Auction 
                  id={auction.item.id} 
                  title={auction.item.name} 
                  image={auction.item.imageLink} 
                  price={auction.price}  
                  ownerId={auction.owner} 
                  inspectLink={auction.item.inspectLink == null ? "none" : auction.item.inspectLink}
                  stickerElement={auction.item.stickerString}
                  isOwnOffer={false}
                  rarityColor={auction.item.rarityColor}
                  offerActiveId={auction._id}
                  condition={auction.item.condition}
                />
              </div>
            ))}
          </div>
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
                            <p className='text-xl pt-8'><b>Float:</b> {selectedAuction.item.seed}</p>
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
