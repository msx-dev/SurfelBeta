import "./ReportedSpots.css";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NearbyCard from "../Nearby/NearbyCard/NearbyCard";



export default function ReportedSpots({viewState, pinClicked}) {
    const [latitude, setLatitude] = useState(viewState.latitude);
    const [longitude, setLongitude] = useState(viewState.longitude);
    const [reported, setReported] = useState([]);

    //Get nearby spots
    useEffect(()=> {
        const getNearbySpots = async () => {
            
            try {
                

                const response = await axios.get("/pins/reportedPins");
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
    <ClickAwayListener>
        <div className='nearby-spot'>
            <div className="quit-nearby-spots">
                <h1 className='cancel-nearby'>X</h1>
            </div>
            <div className="nearby-cards">
                {reported.map(nearby=> (
                    <div className="nearby-card-wrapper" onClick={()=>pinClicked(nearby._id, nearby.lat, nearby.long)}>
                        <NearbyCard nearby={nearby}/>
                    </div>
                ))}
            </div>
        </div>
    </ClickAwayListener>
  )
}
