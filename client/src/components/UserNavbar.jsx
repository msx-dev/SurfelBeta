import React, {useEffect, useState } from 'react';
import Avatar1 from "../public/avatars/1.svg";
import Avatar2 from "../public/avatars/2.svg";
import Avatar3 from "../public/avatars/3.svg";
import Avatar4 from "../public/avatars/4.svg";
import Avatar5 from "../public/avatars/5.svg";
import Avatar6 from "../public/avatars/6.svg";
import Avatar7 from "../public/avatars/7.svg";
import Avatar8 from "../public/avatars/8.svg";
import Avatar9 from "../public/avatars/9.svg";
import Avatar10 from "../public/avatars/10.svg";
import "./UserNavbar.css";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function UserNavbar({avatar, handleLogout, storedData, setMapStyle, setMapView, setOpenNearby}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [profile, setProfile] = useState(avatar);

    const mapView = () => {
        const currentView = storedData.getItem("mapView");
        if(currentView === "satellite"){
            storedData.setItem("mapView", "cartoon");
            setMapStyle("mapbox://styles/mapbox/satellite-v8");
            setMapView("cartoon")
        }else{
            storedData.setItem("mapView", "satellite");
            setMapStyle("mapbox://styles/msude/cl0b56qxj000215qj1qgx7faq");
            setMapView("satellite")
        }
    }

  return (
    <div className="user-controls">
        <div className='avatar-image-wrapper'>
            {profile===1 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar1}/>
            ) : profile===2 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar2}/>
            ) : profile===3 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar3}/>
            ) : profile===4 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar4}/>
            ) : profile===5 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar5}/>
            ) : profile===6 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar6}/>
            ) : profile===7 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar7}/>
            ) : profile===8 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar8}/>
            ) : profile===9 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar9}/>
            ) : profile===10 ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar10}/>
            ): <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar10}/>}
        </div>
        {showDropdown && (
            <ClickAwayListener onClickAway={()=>setShowDropdown(false)}>
                <div className='dropdown'>
                    <h2 className='dropdown-option' onClick={()=> {mapView(); setShowDropdown(false);}}>Toggle View</h2>
                    <h2 className='dropdown-option' onClick={()=> {setOpenNearby(true); setShowDropdown(false);}}>Nearby Spots</h2>
                    <h2 className='dropdown-option' onClick={handleLogout}>Log Out</h2>
                </div>
            </ClickAwayListener>
        )}
     
    </div>
  )
}
