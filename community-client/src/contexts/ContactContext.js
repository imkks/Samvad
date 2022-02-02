import react from "react"
import { useLayoutEffect,useContext,useState } from "react"

const ContactContext=react.createContext()
export const useContacts=()=>useContext(ContactContext);
export const ContactsProvider=({children})=>{
    const [contacts, setContacts] = useState({})

    useLayoutEffect(() => {
        const addUsers=(data)=>{
            let myUser={}
            data.forEach((cntct)=>{
                myUser[cntct.id]=cntct.name;
            })
            setContacts(myUser)

        }
        async function fetchUserInfo(){
          let response=await fetch(`http://localhost:4000/users`, {
              method: 'GET', 
            })
            let data=await response.json();
            await addUsers(data)
        }
        fetchUserInfo();
  
         
        
      }, [])

    return(
        <ContactContext.Provider value={contacts}>
            {children}
        </ContactContext.Provider>
    )
}