import "./Register.css";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React, { useRef, useState } from 'react'
import axios from "axios";
import Avatar1 from "../../../public/avatars/1.svg";
import Avatar2 from "../../../public/avatars/2.svg";
import Avatar3 from "../../../public/avatars/3.svg";
import Avatar4 from "../../../public/avatars/4.svg";
import Avatar5 from "../../../public/avatars/5.svg";
import Avatar6 from "../../../public/avatars/6.svg";
import Avatar7 from "../../../public/avatars/7.svg";
import Avatar8 from "../../../public/avatars/8.svg";
import Avatar9 from "../../../public/avatars/9.svg";
import Avatar10 from "../../../public/avatars/10.svg";

export default function Register({setRegister, storedData, setCurrentUser, setAvatar}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        setSuccess(false);
        setFailure(false);
        e.preventDefault();
        const registerUser =  {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        
        setUsername(nameRef.current.value);
        setPassword(passwordRef.current.value);
        

        try {
            const response = await axios.post("http://localhost:5001/api/users/register", registerUser);
            console.log(response.status);
            if(response.status === 200){
                setSuccess(true);
            }else{
                setFailure(true);
            }

            setTimeout(() => {
                setAvatarSelection(true);
              }, "1000")
            
        } catch (error) {
            console.log(error);
            setFailure(true);
        }
    }

    const handleAvatar = async (avatar) => {
        console.log(username);
        const userAvatar = {
            username: username,
            avatar: avatar,
        }
        try {
            const response = await axios.post("/users/avatar", userAvatar);
            if(response.status===200){
                const loginUser =  {
                    username: username,
                    password: password
                }
                try {
                    const response = await axios.post("/users/login", loginUser);
                    console.log(response);
                    storedData.setItem("user", response.data.username);
                    storedData.setItem("u_id", response.data._id);
                    storedData.setItem("avatar", avatar);
                    setAvatar(avatar);
                    setCurrentUser(response.data.username);
                    setSuccess(true);
                } catch (error) {
                    console.log(error);
                    setFailure(true);
                }
                setRegister(false);
            }else{
                setRegister(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    
    <ClickAwayListener onClickAway={()=>setRegister(false)}>
        {avatarSelection === false ? (
            <div className="register-div">
                <h1 className='cancel' onClick={()=>setRegister(false)}>X</h1>
                <h1 className="form-heading">Register</h1>
                <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="register-inputs">
                        <input className="input-form" type="text" placeholder="Username" ref={nameRef}/>
                        <input className="input-form" type="email" placeholder="Email" ref={emailRef}/>
                        <input className="input-form" type="password" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <div className="form-button-container">
                        <button className="form-button" type="submit">Register</button>
                    </div>
                    <div className="form-response-div">
                        {success && <span>Successfully registered!</span>}
                        {failure && <span>Oops, something went wrong!</span>}
                    </div>
                </form>
            </div>
        ) : (
            <div className="avatar-div">
                <h1 className="form-heading">Select avatar</h1>
                <div className="avatar-options">
                    <div className="avatar-row">
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(1)} className="avatar" src={Avatar1} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(2)} className="avatar" src={Avatar2} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(3)} className="avatar" src={Avatar3} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(4)} className="avatar" src={Avatar4} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(5)} className="avatar" src={Avatar5} alt="Avatar"/>
                        </div>
                    </div>
                    <div className="avatar-row">
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(6)} className="avatar" src={Avatar6} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(7)} className="avatar" src={Avatar7} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(8)} className="avatar" src={Avatar8} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(9)} className="avatar" src={Avatar9} alt="Avatar"/>
                        </div>
                        <div className="avatar-wrapper">
                            <img onClick={()=>handleAvatar(10)} className="avatar" src={Avatar10} alt="Avatar"/>
                        </div>
                    </div>
                </div>
            </div>
            

        )}
        
    </ClickAwayListener>
  )
}
