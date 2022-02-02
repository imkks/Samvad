import react, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { useRoom } from './RoomContext';
import { useSocket } from './SocketContext';

const MessageContext=react.createContext();
export const useMessages=()=>useContext(MessageContext);
export const MessageProvider=({children})=>{
    const [messages, setMessages] = useState({});
    const [pvtMessages, setPvtMessages] = useState({});

    const {dms,setDms,tabIndex}=useRoom();
    const {user}=useAuth();
    const {socket}=useSocket();
    const sendMessage=(data)=>{
        socket.emit('send_message',data);
        if(data.receiverId)
        {

            if(tabIndex in pvtMessages)
            setPvtMessages({...pvtMessages,[tabIndex]:[...pvtMessages[tabIndex],{msg:data.content,senderId:user}]});
            else
            setPvtMessages({...pvtMessages,[tabIndex]:[{msg:data.content,senderId:user}]});


        }
        if(data.roomId)
        {
            if(tabIndex in messages)
            setMessages({...messages,[tabIndex]:[...messages[tabIndex],{msg:data.content,senderId:user}]});
            else
            setMessages({...messages,[tabIndex]:[{msg:data.content,senderId:user}]});


        }
        
        //  setRooms({...rooms,[tabIndex]:{name:rooms[tabIndex].name,messages:[...rooms[tabIndex].messages,data]}})
    }
    
    
    useEffect(() => {
        if(!socket)
            return;
            const retrieveMessages=(data)=>
            {
                const newroomMsgs={}
                const newpvtMsgs={};
                const pvtRooms={};
                data['grpmsgs'].forEach((obj)=>{
                    
                        if(!(obj.roomId in newroomMsgs))
                            newroomMsgs[obj.roomId]=[];
                        newroomMsgs[obj.roomId].push({msg:obj.message,senderId:obj.senderId})
                    
                }) 
                data['pvtmsgs'].forEach((obj)=>{
                    if(obj.senderId==user)
                    {
                        pvtRooms[obj.receiverId]=''
                        if(!(obj.receiverId in newpvtMsgs))
                        newpvtMsgs[obj.receiverId]=[];
                    newpvtMsgs[obj.receiverId].push({msg:obj.message,senderId:obj.senderId})

                    }
                    if(obj.receiverId==user)
                    {
                        pvtRooms[obj.senderId]=''
                        if(!(obj.senderId in newpvtMsgs))
                        newpvtMsgs[obj.senderId]=[];
                    newpvtMsgs[obj.senderId].push({msg:obj.message,senderId:obj.senderId})
                    }
                    
                
            })  
                setMessages({...messages,...newroomMsgs})
                setPvtMessages({...pvtMessages,...newpvtMsgs})
                setDms({...dms,...pvtRooms})
            }
            const receiveMessage=(data)=>
    {
        if(data.roomId)
        {

            if(data.roomId in messages)
            {

                setMessages({...messages,[data.roomId]:[...messages[data.roomId],{msg:data.msg,senderId:data.senderId}]})
            }
            else
                setMessages({...messages,[data.roomId]:[{msg:data.msg,senderId:data.senderId}]})


        }
        if(data.receiverId)
        {
            if(data.senderId in pvtMessages)
            {
                setPvtMessages({...pvtMessages,[data.senderId]:[...pvtMessages[data.senderId],{msg:data.msg,senderId:data.senderId}]})
            }
            else
            {
                setDms({...dms,[data.senderId]:''})
                setPvtMessages({...pvtMessages,[data.senderId]:[{msg:data.msg,senderId:data.senderId}]})
            }
        }

    }
        socket.on('receive_message',(data)=>receiveMessage(data))
        socket.on('receive_all_messages',(data)=>retrieveMessages(data))
        return () => {
            socket.off('receive_message')
            socket.off('receive_all_messages')
        }
        
    },[socket,user,messages,pvtMessages])
    
   
    const value={messages,setMessages,pvtMessages,setPvtMessages,sendMessage}
    return (
        <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
    )
}