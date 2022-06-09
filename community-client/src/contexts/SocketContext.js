import react from "react";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


const SocketContext= react.createContext();
export const useSocket=()=>
{
    return useContext(SocketContext)
}
export const SocketProvider=({id,children})=>
{
    
    const [socket, setSocket] = useState()
    
    
    useEffect(() => {
        const newSocket=io('https://addr-resolver.herokuapp.com/',{ transports : ['websocket'],query:{userId:id}});
        setSocket(newSocket);
        return () => {
            newSocket.close()
        }
    }, [id])
    const value={socket}
    return (<SocketContext.Provider value={value}>
        {children}
    </SocketContext.Provider>)
}