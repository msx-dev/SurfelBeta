import "./ReportedSpots.css";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NearbyCard from "../Nearby/NearbyCard/NearbyCard";



export default function ReportedSpots({viewState, pinClicked, setOpenNearby}) {
    const [latitude, setLatitude] = useState(viewState.latitude);
    const [longitude, setLongitude] = useState(viewState.longitude);
    const [reported, setReported] = useState([]);

    //Get nearby spots
    useEffect(()=> {
        const getNearbySpots = async () => {
            
            try {
                

                const response = await axios.get("http://192.168.0.30:5001/api/pins/reportedPins");
                //console.log(response.data.rated);
                const reported_spots = response.data;


                setReported(reported_spots);    
            } catch (error) {
                console.log(error);
            }
        }

        getNearbySpots();
    }, [])

   
  return (
    <ClickAwayListener onClickAway={()=>setOpenNearby(false)}>
        <div className='nearby-spot'>
            <div className="quit-nearby-spots">
                <h1 className='cancel-nearby' onClick={()=>setOpenNearby(false)}>X</h1>
            </div>
            <div className="nearby-cards">
                {reported.map(nearby=> (
                    <div className="nearby-card-wrapper" onClick={()=>pinClicked(nearby._id, nearby.lat-0.008, nearby.long)}>
                        <NearbyCard nearby={nearby}/>
                    </div>
                ))}
            </div>
        </div>
    </ClickAwayListener>
  )
}
