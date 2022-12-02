import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer, Toast, toast} from 'react-toastify'
import axios from 'axios';
import dbs3 from "../images/dbs3.png";

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generateError = (err) => 
        toast.error(err, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {   // prevents form from submitting when button clicked
        e.preventDefault();
        try {               // always do this when doing API calls
            const {data} = await axios.post("http://localhost:4000/login", {
                ...values         // send email as well as password to db
            }, {withCredentials: true}
            );
            console.log(data);
            if (data) {
                if (data.errors) {
                    const {email, password} = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/")
                }
            }
        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div className='App'>
        <header>
            <div>
                <img className='logo' src={dbs3} alt=""/>
            </div>
        </header>
        <div className='container'>
            <h2>Login Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" placeholder='Email' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" placeholder='Password' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}/>
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account? <Link to="/register">Register</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    </div>
  )
}
