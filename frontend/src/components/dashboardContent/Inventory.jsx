import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Auction from '../auction/Auction';
import {useAppState} from '../../lib/AppStateManager';

const Inventory = () => {


  const { state } = useAppState();
  const [items, setItems] = useState([]);
  let bool = true;
  useEffect(() => {
    const fetchData = async () => {    
        if (bool)  {
        try {
          let data = await axios.get(`http://localhost:8001/steamInventory?userId=${state.user.steamid}`)
          setItems(data.data);
          bool = !bool
          console.log(data.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };


    fetchData();
    
  }, []);


  return (
    items.length == 0 ? <></> :
    <>
      <div className='flex flex-wrap '>          
        {items.map((auction, i) => (
          <div key={i}>
            <Auction 
              id={auction.classid} 
              title={auction.markethashname} 
              image={auction.image} 
              price={auction.priceavg} 
              seed={"TODO"} 
              condition={auction?.wear} 
              target='usersItems'
              rarityColor={auction.color}
              ownerId={state.user.steamid}
              isOwnOffer={true}
              inspectLink={auction.inspectlink == null ? "none" : auction.inspectlink}
              stickerElement={auction.descriptions[auction.descriptions.length - 1].value}
              category={auction.itemgroup}
              />   
          </div>
        ))}
      </div>
    </>
  );
}

export default Inventory
