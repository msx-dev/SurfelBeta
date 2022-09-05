import "./NearbySpots.css";
import React, { useEffect, useState } from 'react';
import "./SpotDetailed.css";
import Wave from "../public/forecast/wave.png";
import Sunny from "../public/forecast/sunny.png";
import Cloudy from "../public/forecast/cloud.png";
import Stormy from "../public/forecast/dark-and-stormy.png";
import Rainy from "../public/forecast/downpour.png";
import North from "../public/directions/North.png";
import NorthEast from "../public/directions/NorthEast.png";
import East from "../public/directions/East.png";
import SouthEast from "../public/directions/SouthEast.png";
import South from "../public/directions/South.png";
import SouthWest from "../public/directions/SouthWest.png";
import West from "../public/directions/West.png";
import NorthWest from "../public/directions/NorthWest.png";
import Timer from "../public/forecast/timer.png";
import Speed from "../public/forecast/Speed.png"
import { averageSwell } from '../functions/getAverageSwell';
import { averagePeriod } from '../functions/getAveragePeriod';
import { getWeatherString } from '../functions/getWeatherString';
import { getWindDirection } from '../functions/getWindDirection';
import { GiWaveSurfer } from 'react-icons/gi';
import axios from 'axios';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NearbyCard from "./NearbyCard";



export default function NearbySpots({setOpenNearby, viewState, pinClicked}) {
    const [latitude, setLatitude] = useState(viewState.latitude);
    const [longitude, setLongitude] = useState(viewState.longitude);
    const [nearby, setNearby] = useState([]);

    //Get nearby spots
    useEffect(()=> {
        const getNearbySpots = async () => {
            
            try {
                const loc_data = {
                    latitude: latitude,
                    longitude: longitude
                }

                const response = await axios.post("/pins/nearby", loc_data);
                //console.log(response.data.rated);
                const nearbySpots = response.data;

                setNearby(nearbySpots);    
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
                        <NearbyCard rating={nearby.rating}/>
                    </div>
                ))}
            </div>
        </div>
    </ClickAwayListener>
  )
}
