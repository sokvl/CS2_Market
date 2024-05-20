import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Auction from '../auction/Auction';
import Spinner from '../loadingScene/Spinner';
import AuthContext from '../../lib/AuthContext';


const Inventory = () => {

  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {  
      setIsLoading(true);  
        try {
          let data = await axios.get(`http://localhost:8000/inv/${user.steam_id}`)
          setItems(data.data.inventory);

        } catch (error) {
          console.error('Error fetching data:', error);
        }  
        setIsLoading(false);
    };

    fetchData();
    
  }, []);

  return (
    <>
    {isLoading ? <Spinner /> :

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
    } 
  </>
  );
}

export default Inventory
