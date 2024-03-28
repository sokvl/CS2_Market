import React from 'react'

const Success = () => {
  return (
    <div className='flex flex-col justify-center items-center p-10'>
      <i class="fa-regular fa-circle-check animate-bounce text-green-800 font-bold text-[9rem] pb-4"></i>
      <h1 className="font-bold text-[2rem]">Transaction successful!</h1>
    </div>
  )
}

export default Success
