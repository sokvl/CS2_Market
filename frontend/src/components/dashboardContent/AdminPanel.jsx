
import React, {useState, useEffect} from 'react'
import {useTheme} from '../../ThemeContext';

const AdminPanel = ({steamid}) => {

    const { isDarkMode } = useTheme();

    return (
        <>
         
            <div className={` ${isDarkMode ? 'bg-[#1f1d24]' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white' } p-6 rounded-xl mt-2 h-full md:w-2/2 md:ml-6'`}>
                <p className='mb-4 text-3xl text-center'> Admin Panel </p>
                
                <div className='flex-col'>              
                    <button className={`  ${isDarkMode ? 'bg-[#292730]' : 'bg-white text-blue-700'} p-2 rounded-lg text-xl font-bold min-w-fit flex justify-center items-center mt-2`} > Generate raport nr 1 </button>
                    <button className={`  ${isDarkMode ? 'bg-[#292730]' : 'bg-white text-blue-700'} p-2 rounded-lg text-xl font-bold min-w-fit flex justify-center items-center mt-2`} > Generate raport nr 2 </button>
                </div>
                <p className='info mt-2 text-red-400 font-bold'></p>
            </div>
            
        </>
    );
}
export default AdminPanel