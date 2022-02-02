import { useAuth } from "../contexts/AuthContext"
import { ContactsProvider } from "../contexts/ContactContext"
import { MessageProvider } from "../contexts/MessageContext"
import { RoomProvider } from "../contexts/RoomContext"
import { SocketProvider } from "../contexts/SocketContext"
import OpenConversation from "./OpenConversation"
import Sidebar from "./Sidebar"

const WebChat = () => {
    const {user}=useAuth()
    return (
        <RoomProvider>
        <SocketProvider id={user}>
        <ContactsProvider>
        <MessageProvider>
        

        <div className="d-flex" style={{minHeight:"100vh"}}>
             <Sidebar userId={user}/>
             <OpenConversation/>
        </div>
        
        </MessageProvider>
        </ContactsProvider>
        </SocketProvider>
        </RoomProvider>
     
    )
}

export default WebChat
