
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../ThemeContext';
import './navbar.css'
import logo from "../../assets/pngs/logo_cs2market.png";
import LoginButton from '../loginbutton/LoginButton';
import Notifications from '../notifications/Notifications';

function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar (!sidebar);

  return (
    <>
    <div className={`navbar ${isDarkMode ? 'bg-[#1a1625] text-gray-200' : 'bg-white text-blue-700'}`}>
        
        <div className='leftSide'>
            <Link to="/" className="flex items-center text-gray-200">
              <img src={logo} width={86} height={86} /> 
              <h1 className="text-gray-500"> CS2Market</h1>
            </Link>
        </div>   
        <div className="rightSide"> 
            <Link className='menuLink' to="/market"> Market </Link>
            <Notifications />
            <LoginButton />
            <Link>
              <button onClick={toggleTheme} class='text-grey-200'>
                { isDarkMode ? <i class="fa-solid fa-sun text-grey-200"></i> : <i class="fa-solid fa-moon"></i>}
              </button>
            </Link>
            <div className='hiddenLinks'>                 
              <button onClick ={showSidebar}>
                <MenuIcon/>
              </button>
            </div>
        </div>       
    </div>

    {sidebar && (
        <div className='overlay' onClick={showSidebar}></div>
    )}
      <nav className={`${sidebar ? 'nav-menu active' : 'nav-menu'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className='toggle-theme-button'>
          <button onClick={toggleTheme} class='text-grey-200 b1'>
            { isDarkMode ? <i class="fa-solid fa-sun text-grey-200"></i> : <i class="fa-solid fa-moon"></i>}
          </button>
        </div>
        <div className='sidebar-top'> 
          <Notifications />
        </div>
        <ul className='nav-menu-items' onClick ={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>           
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/market'>
              <span>Market</span>
            </Link>
          </li>
          <li className='nav-text'>
            <Link to='/contact'>
              <span>Contact</span>
            </Link>
          </li>
          <li className=''>
            <LoginButton />
          </li>
          <li className='nav-text'>
            <Link>
                <span>
                  
                </span>
            </Link>
          </li>
        </ul>
      </nav>
    <button className='toggle-theme-button' onClick={toggleTheme}>
        Toggle Theme
    </button>

    </>
  )
}

export default Navbar
