import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);
    const [logged, setLogged] = useState(false);

    let loginUser = async () => {
        const tempTokens = {
            "refresh": Cookies.get('refresh'),
            "access": Cookies.get('access')
        }
        if (user == null && authTokens == null) {
           updateToken(tempTokens.refresh)
        }
    }

    let updateToken = async (temp) => {
        let res = await axios.post('http://localhost:8000/token/refresh/',
        {
            'refresh': temp != null ? temp : authTokens?.refresh
        })
        if (res.status == 200) {
            let now = new Date()
            setAuthTokens(res.data)
            let token_string = res.data.access.toString()
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            localStorage.setItem("timeStamp", now.setMinutes(now.getMinutes() + 5))
            setUser(jwtDecode(token_string))
        } else {
            alert("Login unsuccesful.")
        }
        
    }

    const logoutUser = () => {
        window.location.href = '/'
        setAuthTokens(null)
        setUser(null)
        setLogged(false)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }


    let contextData = {
        user:user,
        authTokens: authTokens,
        loginUser:loginUser,
        logoutUser: logoutUser
    }

    useEffect(()=> {

        const accessToken = localStorage.getItem("access")

        if (localStorage.getItem("timeStamp") < new Date() && accessToken)
            logoutUser()

        if(authTokens == null && accessToken) {            
            let tokens = { 
                access: accessToken,
                refresh: localStorage.getItem("refresh")
            }
            setAuthTokens(tokens)
            setUser(jwtDecode(tokens.access.toString()))
            setLogged(true)
        }

        let timeInterval = 270000

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, timeInterval)
        return ()=> clearInterval(interval)
    }, [authTokens, logged])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}