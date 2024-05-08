import React, {useState, useContext } from 'react'
import OfferDetailModal from './OfferDetailModal';
import AuthContext from '../../lib/AuthContext';

const Auction = ({ id, title, offerActiveId, image, price, seed, condition, target, rarityColor, ownerId, isOwnOffer, inspectLink, category, stickerElement }) => {

  const { user } = useContext(AuthContext)

  const [openModal, setopenModal] = useState(false);
  const modalStateHandler = () => {
    setopenModal(prevState => !prevState);
  }

  return(
    <>
      {/**
      * Modal offer detail jak nazwa wskazuje tylko gdy kafelek jest aukcja/oferta
      */}
      {openModal && user ? <OfferDetailModal 
        closerHandler={modalStateHandler}
        imageLink={image}
        inspectLink={inspectLink}
        name={title}
        steam_price={price}
        isOwner={isOwnOffer}
        stickerString={stickerElement}
        ownerId={ownerId}
        rarityColor={rarityColor}
        category={category}
        id={id}
        price={price}
        offerAciveId={offerActiveId}
        condition={condition}
      /> : <></>}
      <div className='flex flex-col bg-[#1f1d24] p-2 m-2 w-fit rounded-md shadow-xl text-white hover:cursor-pointer' onClick={modalStateHandler}>
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
          {/**
          * W zależności od tego czy:
          * a) jesteśmy w eq -> Przycisk sell (sprawdzić czy jesteśmy ownerem)
          * b) Jest to nasza oferta na dashboarzie -> edit, remove ( sprawdzić czy jesteśmy ownerem )
          * c) jesteśmy na markecie -> tylko buy (Nie pozwalamy na edycje oferty z poziomu marketu)
          * Kafelek aukcji -> edit,remove
          * Kafelek itemu -> sell
          */}
          <div className={`flex justify-end text-[0.75rem] mt- ${isOwnOffer ? '' : 'hidden'}`}>
            {/*<button className='p-1 px-2 mx-2 rounded-md bg-[#16121f] border-b-2 border-[#2a2635]'>
              <i class="fa-solid fa-gavel"></i>&nbsp;Auction
            </button>*/}
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
