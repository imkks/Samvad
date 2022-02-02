import { useRoom } from "../contexts/RoomContext"
import AddMemberModal from "./AddMember"
import CreateRoomModal from "./CreateRoomModal"

const Groups = () => {
    const{rooms,setTabIndex,setisDm}=useRoom()
    // console.log(rooms)
    const addButton=
    <button className="float-end btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddMemberModal" >+</button>

    const roomsHtml=[];
    for(let[key,value] of Object.entries(rooms))
    {
        roomsHtml.push(<div key={key} onClick={()=>{setTabIndex(key);setisDm(false)}} className="list-group-item  bg-light border"><p>{value.name}{addButton}</p></div>)
    }
    return (
        <>
        <div className="  bg-primary text-light border">
            <h2>Groups</h2>
         </div>
    <div className="  list-group">
        {roomsHtml}
    </div>
    <div className="  my-4">
        <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#CreateRoomModal" >Create new Group</button>
    </div>
    <CreateRoomModal></CreateRoomModal>
    <AddMemberModal></AddMemberModal>
    </>
    )
}

export default Groups
