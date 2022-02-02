import react, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const RoomContext=react.createContext();
export const useRoom=()=>useContext(RoomContext);
export const RoomProvider=({children})=>{
  const {user}=useAuth();
  const [rooms, setRooms] = useState({})
  const [isDm, setisDm] = useState(false)
  const [dms, setDms] = useState({})
  const [tabIndex,setTabIndex]=useState('')
  const createDm=(userId)=>{
    console.log(userId)
  if(!(userId in dms))
    setDms({...dms,[userId]:''})    
    
  }
    useLayoutEffect(() => {
      async function fetchrooms(){
        let response=await fetch(`http://localhost:4000/rooms/users/${user}`, {
            method: 'GET', 
          })
          let data=await response.json();
          await addRoom(data)
      }
      fetchrooms();

       
      
    }, [user])
function addUsersRoom(data)
{
  fetch("http://localhost:4000/rooms/add",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

    async function addRoom(roomsData)
    {
      const roomData={}
      // const dmData={}
      roomsData.forEach((room)=>{
        // if(!room.isPrivateRoom)
          roomData[room.id]={name:room.name,messages:[]};
        // else
        //   dmData[room.id]={name:room.name,messages:[]};
      })
      setRooms(roomData);
      // setDms(dmData)
    }
    const createRoom=(data)=>{
      
        fetch(`http://localhost:4000/rooms?user=${user}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }).then(response => response.json())
          .then(result => 
            setRooms({...rooms,[result.id]:{name:result.name,messages:[]}}))
          .catch(error => console.log('error', error));
          
    }
    const value={createRoom,createDm,
      rooms,dms,setDms,setRooms,
      setTabIndex,tabIndex,isDm,
      setisDm,addUsersRoom}
  
    return (<RoomContext.Provider value={value}>
        {children}
    </RoomContext.Provider>)
}
