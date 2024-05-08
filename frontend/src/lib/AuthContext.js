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
        if (!localStorage.getItem("access") && tokenCookies.access !== undefined && user == null) {
            await axios.post('http://localhost:8000/token/refresh/',
            {
                'refresh': tokenCookies.refresh
            })
            .then((res) => setAuthTokens(res.data))
            .catch(err => console.log(err))

            let token_string = authTokens.access.toString()
            localStorage.setItem("access", authTokens.access)
            localStorage.setItem("refresh", authTokens.refresh)
            setUser(jwtDecode(token_string))

            return true;
        }
        if ( user == null ) {
            let access_token = localStorage.getItem("access")
            console.log("access", access_token)
            setUser(jwtDecode(access_token))
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