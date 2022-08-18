import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../firebase-config";

const AuthContext = createContext();
function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState([]);
    const value = {userInfo, setUserInfo};
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
            setUserInfo(currentUser);
            } else {
                setUserInfo('')
            }
        })
    },[])
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === 'undefined') {
        throw new Error('useAuth must be used in AuthProvider')
    }
    return context
}

export {AuthProvider, useAuth} 