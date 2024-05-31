
import React, {useContext, useState} from 'react'
import OfferDetailModal from './OfferDetailModal';
import AuthContext from '../../lib/AuthContext';
import { useLocation } from 'react-router-dom';


const Auction = ({ id, title, offerActiveId, image, price, seed, condition, inventory, rarityColor, owner, isOwnOffer, inspectLink, category, stickerElement, tradeable }) => {
  
  const { user } = useContext(AuthContext)
  const location = useLocation();

  const isOwner = user?.steam_id === owner?.steam_id;
  const isMarketPage = location.pathname === '/market';
  
  const [openModal, setopenModal] = useState(false);
  const modalStateHandler = () => {
    setopenModal(prevState => !prevState);
  }

  return(
    <>

      {openModal && user?.steam_id != null ? 
      <OfferDetailModal 
        closerHandler={modalStateHandler}
        imageLink={image}
        inspectLink={inspectLink}
        name={title}
        steam_price={price}
        isOwner={isOwnOffer}
        stickerString={stickerElement}
        owner={owner}
        rarityColor={rarityColor}
        category={category}
        id={id}
        price={price}
        offerAciveId={offerActiveId}
        condition={condition}
        tradeable={tradeable}
        inventory={inventory}
      /> : <></>}
       <div
        className={`flex flex-col bg-[#1f1d24] p-2 m-2 w-fit rounded-md shadow-xl transform transition duration-300 text-white hover:scale-[115%] hover:cursor-pointer ${
        isOwner && isMarketPage ? 'border border-green-500 hover:shadow-lg hover:shadow-green-500/40' : 'hover:shadow-md hover:shadow-indigo-300/20'}`} onClick={modalStateHandler}>
        <div className="flex flex-row border-t-2 border-r-2 border-l-2 w-fit border-[#3b3847]">
          <img src={image}
            className={`border-b-4 w-[144px] h-[108px]`} 
            style={{ borderColor: `#${rarityColor}`}}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs mt-4 break-words max-w-[144px] h-[2rem]">{title}</p>
          <div>
            <p className="mt-4"><i class={` ${isOwnOffer ? 'fa-brands fa-steam-symbol' : 'fa-solid fa-coins'} text-zinc-400`}></i>&nbsp;{price} $</p>
          </div>
          <div className={`flex justify-end text-[0.75rem] mt- ${isOwnOffer ? '' : 'hidden'}`}>
              <button className='p-1 px-2 rounded-md bg-[#16121f] border-b-2 border-[#2a2635]'>
              <i class="fa-solid fa-tag"></i>&nbsp;List
              </button>
          </div>
        </div>
      </div>
    </>
  )
    
}

export default Auction
