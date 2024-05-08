import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import AuthContext from '../lib/AuthContext';

import Cookies from "js-cookie";

const LoginSuccess = () => {

    const [logged, setLogged] = useState(False);
    const { loginUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    useEffect(async () => {
      if (loginUser()) 
         setLogged(true);
    }, [])

  return (
    <div>
        {logged ?  <h2>Cool</h2>:<h1>Logging in</h1>}
    </div>
  )
}

export default LoginSuccess
