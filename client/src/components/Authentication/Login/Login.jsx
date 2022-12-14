import "./Login.css";
import React, { useRef, useState } from 'react'
import axios from "axios";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function Login({storedData, setCurrentUser, setLogin, setAvatar, setAdmin}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUser =  {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const response = await axios.post("http://192.168.0.30:5001/api/users/login", loginUser);
            
            if(response.data.user_type === "user"){
                storedData.setItem("user", response.data.username);
                storedData.setItem("u_id", response.data._id);
                storedData.setItem("avatar", response.data.avatar);

                setAvatar(response.data.avatar);
                setCurrentUser(response.data.username);
            }else if(response.data.user_type === "admin"){
                storedData.setItem("admin_key", process.env.REACT_APP_ADMIN_KEY);
                setAdmin(process.env.REACT_APP_ADMIN_KEY);
                setCurrentUser(response.data.username);
            }
            setSuccess(true);
            setLogin(false);
        } catch (error) {
            console.log(error);
            setFailure(true);
        }
    }

  return (
    <ClickAwayListener onClickAway={()=> setLogin(false)}>
        <div className="login-div">
            <h1 className='cancel' onClick={()=>setLogin(false)}>X</h1>
            <h1 className="form-heading">Login</h1>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="login-inputs">
                    <input className="input-form" type="text" placeholder="Username" ref={nameRef}/>
                    <input className="input-form" type="password" placeholder="Password" ref={passwordRef}/>
                </div>
                <div className="form-button-container-login">
                    <button className="form-button" type="submit">Login</button>
                </div>
                <div className="form-response-div-login">
                    {success && <span>Success!!</span>}
                    {failure && <span>Oops, something went wrong!</span>}
                </div>
            </form>
        </div>
    </ClickAwayListener>
  )
}
