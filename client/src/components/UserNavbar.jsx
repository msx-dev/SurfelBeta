import React, {useState } from 'react';
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

export default function UserNavbar({avatar, handleLogout, storedData, setMapStyle}) {
    const [showDropdown, setShowDropdown] = useState(false);

    const mapView = () => {
        const currentView = storedData.getItem("mapView");
        if(currentView === "satellite"){
            storedData.setItem("mapView", "cartoon");
            setMapStyle("mapbox://styles/mapbox/satellite-v8");
        }else{
            storedData.setItem("mapView", "satellite");
            setMapStyle("mapbox://styles/msude/cl0b56qxj000215qj1qgx7faq");
        }
    }

  return (
    <div className="user-controls">
        <div className='avatar-image-wrapper'>
            {avatar==="1" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar1}/>
            ) : avatar==="2" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar2}/>
            ) : avatar==="3" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar3}/>
            ) : avatar==="4" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar4}/>
            ) : avatar==="5" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar5}/>
            ) : avatar==="6" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar6}/>
            ) : avatar==="7" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar7}/>
            ) : avatar==="8" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar8}/>
            ) : avatar==="9" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar9}/>
            ) : avatar==="10" ? (
                <img onClick={()=>setShowDropdown(!showDropdown)} className="avatar-image" src={Avatar10}/>
            ): <></>}
        </div>
        {showDropdown && (
            <div className='dropdown'>
                <h2 className='dropdown-option' onClick={()=> {mapView(); setShowDropdown(false);}}>Satellite View</h2>
                <h2 className='dropdown-option'>Nearby Spots</h2>
                <h2 className='dropdown-option'>Log Out</h2>
            </div>
        )}
          <button className="button" onClick={handleLogout}>Log Out</button>
    </div>
  )
}
