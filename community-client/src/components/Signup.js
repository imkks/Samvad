import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Signup = () => {
    const nameRef = useRef()
    const {signUp}=useAuth();

    const submitHandler=(e)=>{
        e.preventDefault();
        signUp({name:nameRef.current.value})
        // navigate('/')
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <form action="" className="border p-5 w-50">
                <div className="mb-3">
                    <label className="form-label">username</label>
                    <input ref={nameRef} type="text" className="form-control"></input>
                </div>

                <div className="mb-3">
                    <button onClick={submitHandler} className="btn btn-primary w-100">Create Account</button>
                </div>
                <div className="form-text">Already have an account <Link to="/login">Login</Link> </div>
            </form>
        </div>
    )
}

export default Signup
