import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from "axios";
import {ToastContainer, Toast, toast} from 'react-toastify'
import dbs3 from "../images/dbs3.png";

export default function Secret() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const {data} = await axios.post("http://localhost:4000", {}, {withCredentials: true});
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                }
                else toast(`HI ${data.user}`, {theme:"dark"});
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie])

    const logOut = () => {
        removeCookie("jwt");
        navigate("/register");
    }
  return (
    <div className='App'>
        <header>
            <div>
                <img className='logo' src={dbs3} alt=""/>
            </div>
        </header>
        <div className='page'>
            <button className='logout' onClick={logOut}>Log Out</button>
        </div>
        <ToastContainer />
    </div>
  )
}
