import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(null)

    let loginUser = async () => {
        const tokenCookies = {
            "refresh": Cookies.get('refresh'),
            "access": Cookies.get('access')
        }
        if (tokenCookies.access !== undefined && user == null) {
            await axios.post('http://localhost:8000/token/refresh/',
            {
                'refresh': tokenCookies.refresh
            })
            .then((res) => setAuthTokens(res.data))
            .catch(err => console.log(err))

            //Cookies.remove('refresh')
            //Cookies.remove('access')

            setUser(jwtDecode((authTokens?.access)?.toString()))

            return true;
        }
        return false;
    }

    let contextData = {
        user:user,
        loginUser:loginUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}