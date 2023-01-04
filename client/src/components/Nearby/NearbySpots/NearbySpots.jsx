import "./NearbySpots.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NearbyCard from "../NearbyCard/NearbyCard";



export default function NearbySpots({setOpenNearby, viewState, pinClicked}) {
    const storedData = window.localStorage;
    const [nearby, setNearby] = useState([]);

    //Get nearby spots
    useEffect(()=> {
        const getNearbySpots = async () => {
            
            try {
                const loc_data = {
                    latitude: Number(storedData.getItem("latitude")),
                    longitude: Number(storedData.getItem("longitude"))
                }

                

                const response = await axios.post("http://192.168.0.30:5001/api/pins/nearby", loc_data);
                //console.log(response.data.rated);
                const nearbySpots = response.data;

                var sortedNearby = nearbySpots.sort((a, b) => b.rating-a.rating);

                setNearby(sortedNearby);    
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
                <h1 className='cancel-nearby' onClick={()=> setOpenNearby(false)}>X</h1>
            </div>
            <div className="nearby-cards">
                {nearby.map(nearby=> (
                    <div className="nearby-card-wrapper" onClick={()=>pinClicked(nearby._id, nearby.lat, nearby.long)}>
                        <NearbyCard nearby={nearby}/>
                    </div>
                ))}
            </div>
        </div>
    </ClickAwayListener>
  )
}
