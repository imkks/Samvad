import { useState,useCallback,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useContacts } from "../contexts/ContactContext";
import { useMessages } from "../contexts/MessageContext";
import { useRoom } from "../contexts/RoomContext"

import Messages from "./Messages";
import SubmitMessage from "./SubmitMessage";
import Welcome from "./Welcome";

const OpenConversation = () => {
    
    const {user}=useAuth();
    const sref=useCallback((node)=>{
        if(node!==null)
            node.scrollIntoView({smooth:true})
    },[])
    const contacts=useContacts();
    const {tabIndex,isDm}=useRoom();
    
    const {messages,pvtMessages}=useMessages();
    if(!tabIndex) return (<Welcome/>); 
    const messageElement=[]
    if(messages[tabIndex]){
    messages[tabIndex].forEach((value,idx)=>
        messageElement.push(<Messages key={idx} isMyMessage={value.senderId===user} content={value.msg} sender={contacts[ value.senderId]}></Messages>))
    }
    if(pvtMessages[tabIndex]){
        pvtMessages[tabIndex].forEach((value,idx)=>
            messageElement.push(<Messages key={idx} isMyMessage={value.senderId===user} content={value.msg} sender={contacts[ value.senderId]}></Messages>))
        }
    // console.log(messages)
    
    return (
        <div className="d-flex flex-column flex-grow-1 m-3">
            <div className="flex-grow-1 d-flex flex-column">
               
            {messageElement}  
            <div ref={sref}></div>
            {tabIndex}
            {/* {messages[tabIndex]?messages[tabIndex][0]:''} */}
            </div>
            <SubmitMessage isDm={isDm}/>
            
        </div>
    )
}

export default OpenConversation
