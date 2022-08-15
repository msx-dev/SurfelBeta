import "./Login.css";

import React, { useRef, useState } from 'react'
import axios from "axios";

export default function Login({storedData, setCurrentUser}) {
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
            const response = await axios.post("/users/login", loginUser);
            storedData.setItem("user", response.data.username);
            storedData.setItem("u_id", response.data._id);
            setCurrentUser(response.data.username);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setFailure(true);
        }
    }

  return (
    <div className="login-div">
        <h1 className="avatar-heading">Login</h1>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="login-inputs">
                <input className="input-form" type="text" placeholder="Username" ref={nameRef}/>
                <input className="input-form" type="password" placeholder="Password" ref={passwordRef}/>
            </div>
            <button className="form-button" type="submit">Login</button>
            {success && <span>Success!!</span>}
            {failure && <span>Oops, something went wrong!</span>}
        </form>
    </div>
  )
}
