import React from 'react';
import { GiWaveSurfer } from 'react-icons/gi';
import "./PopupContent.css";

export default function PopupContent({title, rating, setOpenDetails, setClickedId, setOpenSmall}) {
  return (
    <div className="popup">
        <h1 className='popup-text'>Title</h1>
        <h1 className='popup-value'>{title}</h1>
        <h1 className='popup-text'>Rating</h1>
        <h1 className='popup-value'>{rating}</h1>
        <button onClick={()=>{setOpenDetails(true); setOpenSmall(false);}} className="popup-detail-button">Details</button>
    </div>
  )
}
