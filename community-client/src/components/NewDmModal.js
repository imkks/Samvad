import { useRef } from "react";
import { useContacts } from "../contexts/ContactContext";
import { useRoom } from "../contexts/RoomContext"

const NewDmModal = () => {
  const {createDm}=useRoom();
  const contacts=useContacts();
  const optionHtml=[]
  for(let [key,value] of Object.entries(contacts))
  {
    optionHtml.push(<option key={key} value={key}>{value}</option>)
  }
  // console.log(optionHtml)

  const userIDref = useRef(null)
  const submitHandler=(e)=>
  {
    e.preventDefault();
    createDm(userIDref.current.value)
  }
    return (
        
            <div className="modal fade" id="NewDmModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="NewDmModal">Enter New userID</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}> 
            <label className="form-label">User Id</label>
            {/* <input  className="form-control" type="text"/> */}
            <select ref={userIDref} className="form-select">
            <option>...</option>
            {optionHtml}
            </select>
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

export default NewDmModal
