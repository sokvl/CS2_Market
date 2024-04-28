import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(null)

    let loginUser = () => {
        const tokenCookies = {
            "refresh": Cookies.get('refresh'),
            "access": Cookies.get('access')
        }
        console.log(tokenCookies)
        if (tokenCookies.access !== undefined) {
            setAuthTokens(tokenCookies);
            setUser(jwtDecode(tokenCookies.access))
            localStorage.setItem('authTokens', JSON.stringify(tokenCookies));
        }
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