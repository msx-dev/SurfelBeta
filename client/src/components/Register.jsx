import "./Register.css";

import React, { useRef, useState } from 'react'
import axios from "axios";

export default function Register() {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerUser =  {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const response = await axios.post("/users/register", registerUser);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setFailure(true);
        }
    }

  return (
    <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="Username" ref={nameRef}/>
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            <button type="submit">Register</button>
            {success && <span>Successfully registered!</span>}
            {failure && <span>Oops, something went wrong!</span>}
        </form>
    </div>
  )
}
