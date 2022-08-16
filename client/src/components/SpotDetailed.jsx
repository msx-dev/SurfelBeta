import React, { useEffect, useState } from 'react';
import "./SpotDetailed.css";
import Wave from "../public/forecast/wave.png";
import Sunny from "../public/forecast/sunny.png";
import Cloudy from "../public/forecast/cloud.png";
import Stormy from "../public/forecast/dark-and-stormy.png";


export default function SpotDetailed({FORECAST_ID}) {

    useEffect(()=> {
        const getForecast = async () => {
            const API_KEY = process.env.REACT_APP_WEATHERAPI;
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat={40}&lon={40}&appid={${API_KEY}}`)
                .then(({ results }) => (console.log(results)));
            } catch (error) {
                
            }
        }
        
        getForecast();
    }, [])

    useEffect(()=> {
        const getConditions = async () => {
            
            
            try {
                const data = {  
                    "lat": 29.52848625529286,
                    "lon": -14.044638842544543,
                    "model": "gfsWave",
                    "parameters": ["wind", "dewpoint", "rh", "pressure", "waves", "swell1", "swell2"],
                    "levels": ["surface", "800h", "300h"],
                    "key": process.env.REACT_APP_FORECAST
                }

                const response = await fetch('https://api.windy.com/api/point-forecast/v2', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                      'Content-Type': 'application/json'
                      
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                  })

                  const forecastData = await response.json()

                  const wavesHeight = forecastData["waves_height-surface"];

                  const divider = Object.keys(wavesHeight).length;
                  
                  let sum = 0


                  for (const key in wavesHeight) {
                    if (wavesHeight.hasOwnProperty(key)) {
                        const value = wavesHeight[key];
                        sum += value;
                
                    }
                }
                console.log(sum/80);
                
               
                  
            } catch (error) {
                
            }
        }
    
        getConditions();
    }, [])
  return (
    <div className='detailed-spot'>
        <div className='spot-names'>
            <p className='spot-name-description'>Spot Title</p>
            <h1 className='spot-title'>Praia Baleal</h1>
            <p className='spot-name-description'>Spot Review</p>
            <h2 className='spot-description'>An amazing spot, right on the sandy beach. Tide is a bit strong, but waves are perfect for all levels.</h2>
            <div className='author-div'>
                <p className='written-by'>Written by</p>
                <p className='review-author'>TestUser123</p>
            </div>
            <p className='spot-name-rating'>Spot Rating</p>
            <h1 className='spot-title'>4.4</h1>
            <p className='all-ratings'>1234 ratings</p>
        </div>
        <div className='spot-forecast'>
            <div className='surf-conditions'>
                <div className='waves'>
                <div className='upper-waves'>
                    <img src={Wave} className="conditions-icon" alt="wave"/>
                    <p className='conditions-name'>Wave Conditions</p>
                </div>

                </div>
                <div className='tide'>


                </div>
            </div>
            <div className='weather'>
                <div className='today'>
                    <p className='today-descriptor'>Today</p>
                    <div className='today-card'>
                        <img src={Sunny} className="today-weather-icon" alt="weather icon"/>
                        <div className='today-temperature'>
                            <p className='today-celsius'>Hi: 28 °C</p>
                            <p className='today-celsius'>Lo: 15 °C</p>
                        </div>
                    </div>
                </div>
                <div className='upcoming'>
                        <p className='upcoming-descriptor'>Fri</p>
                        <div className='upcoming-card'>
                            <img src={Cloudy} className="upcoming-weather-icon" alt="weather icon"/>
                            <div className='upcoming-temperature'>
                                <p className='upcoming-celsius'>Hi: 28 °C</p>
                                <p className='upcoming-celsius'>Lo: 15 °C</p>
                            </div>
                        </div>
                    </div>
                    <div className='upcoming'>
                        <p className='upcoming-descriptor'>Sat</p>
                        <div className='upcoming-card'>
                            <img src={Stormy} className="upcoming-weather-icon" alt="weather icon"/>
                            <div className='upcoming-temperature'>
                                <p className='upcoming-celsius'>Hi: 28 °C</p>
                                <p className='upcoming-celsius'>Lo: 15 °C</p>
                            </div>
                        </div>
                    </div>
                

            </div>
        </div>
        <div className='charts'>

        </div>
    </div>
    //Transition to another div, which has all the comments
    //Make sure to add export PDF option for forecast
  )
}
