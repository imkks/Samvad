import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export const Login = () => {
    const [userId, setuserId] = useState('')
    const {login}=useAuth();
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        login(userId)
        navigate('/')

    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <form action="" className="border p-5 w-50">
                <div className="mb-3">
                    <label className="form-label">userId</label>
                    <input type="text" value={userId} onChange={(e)=>setuserId(e.target.value)} className="form-control"></input>
                </div>
                <div className="mb-3">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">Login</button>
                </div>
                <div className="form-text">Dont have an account  <Link to="/signup">Sign Up</Link> </div>

            </form>
        </div>
    )
}
