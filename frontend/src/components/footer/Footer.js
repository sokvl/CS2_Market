import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '../../ThemeContext';
import './footer.css'

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`footer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='socialMedia'>     
        <InstagramIcon className='social-media'/>
        <FacebookIcon className='social-media'/>
        <TwitterIcon className='social-media'/>
      </div>  
      <p> &copy; 2023 cs2market.pl</p>  
    </div>
  )
}

export default Footer
