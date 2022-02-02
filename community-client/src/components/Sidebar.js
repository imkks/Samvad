import CreateRoomModal from "./CreateRoomModal"
import NewDmModal from "./NewDmModal"
import logo from  '../assets/a.png'
import Groups from "./Groups"
import Dms from "./Dms"
import { useContacts } from "../contexts/ContactContext"
const Sidebar = ({userId}) => {
    const contacts=useContacts()
    return (
        <div className="pe-3 border-end border-4 border-primary" style={{width:"25%",}}>
            <div className="d-flex justify-content-between" style={{height:"64px"}}>
                <img src={logo} className="rounded img-thumbnail" alt="..."/>
                <h2> I am {contacts[userId]}</h2>

            </div>
            <Groups/>
            <Dms/>
            
        </div>
    )
}

export default Sidebar
