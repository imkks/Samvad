import { useState } from 'react';
import { useMessages } from '../contexts/MessageContext';
import { useRoom } from '../contexts/RoomContext';

const SubmitMessage = ({isDm}) => {
    const [message, setmessage] = useState('')
    const {tabIndex}=useRoom();
    const {sendMessage}=useMessages();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isDm)
            sendMessage({content:message,receiverId:tabIndex})
        else
            sendMessage({content:message,roomId:tabIndex})

        setmessage('')
    }
    return (
        <div className="input-group mb-2">
                <textarea className="form-control" value={message} onChange={(e)=>setmessage(e.target.value)}></textarea>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>

            </div>
    )
}


export default SubmitMessage
