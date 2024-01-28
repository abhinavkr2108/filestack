"use client"

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if(user){
            localStorage.setItem('user', JSON.stringify(user));
        }
    },[user]);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>       
    )
    
}