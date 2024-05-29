import React, { useEffect, useState,useContext  } from "react";
import axios from "axios";
import Auction from "../auction/Auction";
import AuthContext from '../../lib/AuthContext';

const UserOffers = ({creatorId}) => {
 
  const [offers, setOffers] = useState([])

  const { user } = useContext(AuthContext)

  useEffect(() =>{
    const fetchOffers = async () => {
        const userOffers = await axios.get(`http://localhost:8000/offers/${user.steam_id}/`);
        console.log(userOffers.data)
        setOffers(userOffers.data)

    }
    fetchOffers();
  }, [])

  return (
    <div className="flex flex-wrap">
      {offers.map((item, index) => (
        <Auction 
            id={item.item.id}
            title={item.item.name}
            isOwnOffer={true}
            image={item.item.imageLink}
            condition={item.item.condition}
            price={item.price}
            />
      ))}
    </div>
  )
}

export default UserOffers;
