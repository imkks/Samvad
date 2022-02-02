import { useState } from "react";
import { useRoom } from "../contexts/RoomContext";

const CreateRoomModal = () => {
  const {createRoom}=useRoom()
  const [description, setdescription] = useState('')
  const [name, setname] = useState('')
  const submitHandler=(e)=>
  {
    e.preventDefault();
    createRoom({name,description,isPrivateRoom:false})
  }
    return (
        <div className="modal fade" id="CreateRoomModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="CreateRoomModal">Create Room</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
            <label className="form-label">Room Name</label>
            <input className="form-control" type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
            <label className="form-label">Description</label>
            <input className="form-control" type="text" value={description} onChange={(e)=>setdescription(e.target.value)}></input>
            <div className="m-2">
            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100">Create Room</button>

            </div>
            
        </form>
      </div>
      
    </div>
  </div>
</div> 
    )
}

export default CreateRoomModal
