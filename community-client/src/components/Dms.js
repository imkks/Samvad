import { useContacts } from "../contexts/ContactContext";
import { useRoom } from "../contexts/RoomContext";
import NewDmModal from "./NewDmModal"

const Dms = () => {
    const{setTabIndex,dms,setisDm}=useRoom()
    const contacts=useContacts();
    const dmsHtml=[];
    for(let[key,value] of Object.entries(dms))
    {
        dmsHtml.push(<div key={key} onClick={()=>{setTabIndex(key);setisDm(true)}} className="list-group-item bg-light border"><p>{contacts[key]}</p></div>)
    }
    return (
        <>
        <div className="  bg-primary text-light border">
                <h2>Dm</h2>
            </div>
            <div className="  list-group">
               {dmsHtml}
                
            </div>
            <div className="  my-4">
                <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#NewDmModal">New Dm</button>
            </div>   
            <NewDmModal/>         
        </>
    )
}

export default Dms
