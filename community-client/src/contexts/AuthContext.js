import react from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=react.createContext();
export const useAuth=()=>
{
    return useContext(AuthContext)
}
export const AuthProvider=({children})=>
{
    const navigate=useNavigate()

    const [user,setUser]=useState();
    const login =(data)=>{
        setUser(data)
    }
    const signUp= (data)=>
    {
        fetch('http://localhost:4000/users', {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }).then((response)=>response.json()).then(data=>{setUser(data.id);navigate('/')})
          
          
    }
    const value={signUp,user,login};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}