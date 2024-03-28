import React , { useState} from 'react'
import '../styles/contact.css'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useTheme } from '../ThemeContext'
import 'react-toastify/dist/ReactToastify.min.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Contact() {

  const { isDarkMode } = useTheme();

  const {
    handleSubmit,
    reset,
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  const toastifySuccess = () => {
    toast.info('Message sent!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const onSubmit = async (data) => {

      setDisabled(true);

      reset();

      toastifySuccess();
      setDisabled(false);

  };

  return (
    <>
      <div className={`flex w-full min-h-screen justify-center items-center ${isDarkMode ? 'bg-neutral-700 text-white' : 'bg-gradient-to-r from-blue-800 via-indigo-600 to-violet-900'}`}>
         <div className={`flex md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-24 flex-col space-y-6 w-full max-w-4xl p-8 rounded-xl ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white shadow-lg text-blue-600'}`}>
            <div className='flex flex-col space-y-8 justify-between'>
              <div className='mb-16'>
                <h1 className='font-bold text-4xl tracking-wide'> Contact us</h1>
                <p class = {`pt-2 ${isDarkMode ? '' : 'text-blue-500'}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
              <div className='space-y-4'> 
                <div>
                  <LocationOnIcon /> 
                  <span>Somewhere</span>
                </div>
                <div>
                  <LocalPhoneIcon />
                  <span>+48 555 555 555</span>
                </div>
                <div>
                  <MailIcon />
                  <span>golemaStacjaPogodowa@farmazon.tychy</span>
                </div>
              </div>
              <div className='flex space-x-4 text-lg'> 
                <FacebookIcon /> <InstagramIcon/> <TwitterIcon />
              </div> 
            </div>
            <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-neutral-700 text-black' :  'bg-blue-600'}`}>
              <form action='' onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                
                <div>
                  <label for="" className='text-sm text-white'> Full Name</label>
                </div>
                <div>
                  <input type='text' placeholder='Your name' className='ring-1 ring-white 
                  rounded-md px-4 py-2 outline-none focus: ring-2 focus:ring-teal-300'/>
                </div>

                <br />

                <div>
                  <label for="" className='text-sm text-white'> E-mail</label>
                </div>
                <div>
                  <input type='email' placeholder='E-mail address' className='ring-1 ring-white 
                  rounded-md px-4 py-2 outline-none focus: ring-2 focus:ring-teal-300'/>
                </div>

                <br />

                <div>
                  <label for="" className='text-sm text-white'> Message </label>
                </div>
                <div>
                  <textarea rows='5' placeholder='Message' className='ring-1 ring-white 
                  rounded-md px-4 py-2 outline-none focus: ring-2 focus:ring-teal-300'/>
                </div>
                <button type="submit" class={`${isDarkMode ? 'text-black hover:before:bg-blackborder-black-500 relative h-[50px] w-40 overflow-hidden rounded-md bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-zinc-800 border border-solid border-white before:transition-all before:duration-300 hover:text-white hover:before:left-0 hover:before:w-full' : 'text-blue-500 hover:before:bg-blueborder-blue-500 relative h-[50px] w-40 overflow-hidden rounded-md bg-white px-3 text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-600 border border-solid border-white before:transition-all before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:left-0 hover:before:w-full'}`}><span class="relative z-10">send message!</span></button>               
              </form>
              <ToastContainer /> 
            </div>
         </div>
      </div>
    </>
  )
}

export default Contact
