import React from 'react';
import { GiWaveSurfer } from 'react-icons/gi';
import "./PopupContent.css";

export default function PopupContent({title, rating, setOpenDetails, setClickedId, setOpenSmall}) {
  return (
    <div className="popup">
        <label>Title</label>
        <h2>{title}</h2>
        <label>Rating</label>
        {Array(rating).fill(<GiWaveSurfer/>)}
        <button onClick={()=>{setOpenDetails(true); setClickedId(null); setOpenSmall(false);}}>OPEN DETAILS</button>

        
    </div>
  )
}
