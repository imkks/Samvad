import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export const RequiredAuth = ({children}) => {
   const {user}= useAuth()
  
   if(!user)
        return <Navigate to='/login'></Navigate>
    return children
    
}
