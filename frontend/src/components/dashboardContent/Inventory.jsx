import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Auction from '../auction/Auction';

import AuthContext from '../../lib/AuthContext';


const Inventory = () => {

  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  let bool = true;
  useEffect(() => {
    const fetchData = async () => {    
        if (bool)  {
        try {
          let data = await axios.get(`http://localhost:8000/inv/${user.steam_id}`)
          console.log(data)
          setItems(data.data.inventory);
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
              owner={user}
              isOwnOffer={true}
              inspectLink={auction.inspectlink == null ? "none" : auction.inspectlink}
              stickerElement={auction.descriptions[auction.descriptions.length - 1].value}
              category={auction.itemgroup}
              tradeable={auction.tradeable}
              />   
          </div>
        ))}
      </div>
    </>
  );
}

export default Inventory
