import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// Check if user is allowed to access to this route. Else, is rejected, must go to login
function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    //refresh token automatically
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); 
        
        //send a request to the backend for get a new token
        try{
            const res = await api.post("/api/token/refresh/",
                {refresh: refreshToken,}
            );
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }

        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    //check if user need token 
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false);
            return;
        };

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; //get date in seconds

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        } 
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    //isAuthorized ? means, isAuthorized= True
    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;