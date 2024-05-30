import React, { useEffect, useState,useContext  } from "react";
import axios from "axios";
import Auction from "../auction/Auction";
import Spinner from '../loadingScene/Spinner';
import AuthContext from '../../lib/AuthContext';

const UserOffers = ({creatorId}) => {
 
  const [offers, setOffers] = useState([])
  const [isLoading, setIsLoading] = useState(false); 

  const { user } = useContext(AuthContext)

  if (!user) {
    window.location.href = '/'
  }

  useEffect(() => {
    const fetchData = async () => {  
      setIsLoading(true);  
        try {
          let data = await axios.get(`http://localhost:8000/offers/user-active?steam_id=${user?.steam_id}`, {headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`
          }})
          
          setOffers(data.data)
          
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
            <div className='flex flex-wrap'>      
              {offers.map((auction, i) => (
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
    </>
  )
}

export default UserOffers;
