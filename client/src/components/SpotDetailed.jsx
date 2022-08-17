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



export default function SpotDetailed({latitude, longitude, setOpenDetails, title, review, author, rating, setOpenSmall}) {

    const [swell, setSwell] = useState(0);
    const [period, setPeriod] = useState(0);
    const [weatherIcon, setWeatherIcon] = useState();
    const [directionIcon, setDirectionIcon] = useState();
    const [windSpeedKm, setWindSpeedKm] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [maxTempTom, setMaxTempTom] = useState(0);
    const [minTempTom, setMinTempTom] = useState(0);
    const [maxTempAft, setMaxTempAft] = useState(0);
    const [minTempAft, setMinTempAft] = useState(0);
    const [windSpeedKmTom, setWindSpeedKmTom] = useState(0);
    const [weatherIconTom, setWeatherIconTom] = useState();
    const [windSpeedKmAft, setWindSpeedKmAft] = useState(0);
    const [weatherIconAft, setWeatherIconAft] = useState();
    const [openRating, setOpenRating] = useState(false);

    //Get Forecast for current day
    useEffect(()=> {
        const getForecast = async () => {
            const API_KEY = process.env.REACT_APP_WEATHERAPI;
            try {
                let weatherForecast = {}
                //`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
                await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHERAPI}`)
                    .then(res => res.json())
                    .then(result => {
                        //Wind speed in meters/second
                        weatherForecast = result;
                    });
                
                
                //Results for spot's coordinates
                
                //Wind speed, measured in [meters/second]
                let windSpeed = weatherForecast.wind.speed;
                
                //Converts wind speed in [km/s]
                windSpeed = windSpeed * 3.6;
                windSpeed= Math.round(windSpeed * 10) / 10;
                setWindSpeedKm(windSpeed);

                //Set min and max temperature for today, round to 1 decimal
                const todayMax = Math.round(weatherForecast.main["temp_max"]);
                const todayMin = Math.round(weatherForecast.main["temp_min"]);

                setMaxTemp(todayMax);
                setMinTemp(todayMin);


                
                //Wind directions in degrees
                const windDirection = weatherForecast.wind.deg;
        
                //Weather id: 2xx=Thunderstorm, 3xx=Drizzle, 5xx=Rain, 6xx=Snow, 7xx=Smoke/mist/dust, 800=Clear, 801-804=Clouds
                const weatherStatus = weatherForecast.weather[0].id;
                
                //Returns a string for the switch case below
                const weatherString = getWeatherString(weatherStatus);
                
                //Returns a string for the switch case below
                const windDirectionString = getWindDirection(windDirection);


                
               

                //Set weather icon based on return value
                switch(weatherString){
                    case "Stormy": 
                        setWeatherIcon(Stormy);
                        break;
                    case "Rainy": 
                        setWeatherIcon(Rainy);
                        break;
                    case "Clear": 
                        setWeatherIcon(Sunny);
                        break;
                    case "Snowy": 
                        setWeatherIcon(Rainy);
                        break;
                    case "Dust": 
                        setWeatherIcon(Cloudy);
                        break;
                    case "Cloudy": 
                        setWeatherIcon(Cloudy);
                        break;
                    default:
                        setWeatherIcon(Sunny);
                }

                //Set wind direction icon based on return value
                switch(windDirectionString){
                    case "N":
                        setDirectionIcon(North);
                        break;
                    case "NW":
                        setDirectionIcon(NorthWest);
                        break;
                    case "W":
                        setDirectionIcon(West);
                        break;
                    case "SW":
                        setDirectionIcon(SouthWest);
                        break;
                    case "S":
                        setDirectionIcon(South);
                        break;
                    case "SE":
                        setDirectionIcon(SouthEast);
                        break;
                    case "E":
                        setDirectionIcon(East);
                        break;
                    case "NE":
                        setDirectionIcon(NorthEast);
                        break;
                    default:
                        setDirectionIcon(North);

                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
        getForecast();
    }, [])

    //Get Forecast for upcoming days
    useEffect(()=> {
        const getForecast = async () => {
            const API_KEY = process.env.REACT_APP_WEATHERAPI;
            try {
                let weatherForecast = {}
                //`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
                await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHERAPI}`)
                    .then(res => res.json())
                    .then(result => {
                        //Wind speed in meters/second
                        weatherForecast = result;
                        
                    });
                
                //Tomorrow forecast
                const tomorrowWeather = weatherForecast.list[8].weather[0];
                const tomorrowWind = weatherForecast.list[8].wind;
                
                //Tomorrow values
                const tomorrowWeatherStatus = tomorrowWeather.id;
                let tomorrowWindSpeed = tomorrowWind.speed;
                tomorrowWindSpeed = tomorrowWindSpeed * 3.6;
                tomorrowWindSpeed = Math.round(tomorrowWindSpeed * 10) / 10;

                setWindSpeedKmTom(tomorrowWindSpeed);

                //Set max and min temp for tomorrow, round to 1 decimal
                const tomMax = Math.round(weatherForecast.list[8].main["temp_max"]);
                const tomMin = Math.round(weatherForecast.list[8].main["temp_min"]);

                setMaxTempTom(tomMax);
                setMinTempTom(tomMin);

                const tomorrowString = getWeatherString(tomorrowWeatherStatus);
        
                //Set tomorrow icon
                switch(tomorrowString){
                    case "Stormy": 
                        setWeatherIconTom(Stormy);
                        break;
                    case "Rainy": 
                        setWeatherIconTom(Rainy);
                        break;
                    case "Clear": 
                        setWeatherIconTom(Sunny);
                        break;
                    case "Snowy": 
                        setWeatherIconTom(Rainy);
                        break;
                    case "Dust": 
                        setWeatherIconTom(Cloudy);
                        break;
                    case "Cloudy": 
                        setWeatherIconTom(Cloudy);
                        break;
                    default:
                        setWeatherIconTom(Sunny);
                }

                //After tomorrow forecast
                const afterTomorrowWeather = weatherForecast.list[16].weather[0];
                const afterTomorrowWind = weatherForecast.list[16].wind;
                
                //After tomorrow values
                const afterTomorrowWeatherStatus = afterTomorrowWeather.id;
                let afterTomorrowWindSpeed = afterTomorrowWind.speed;
                afterTomorrowWindSpeed = afterTomorrowWindSpeed * 3.6;
                afterTomorrowWindSpeed = Math.round(afterTomorrowWindSpeed * 10) / 10;

                setWindSpeedKmAft(afterTomorrowWindSpeed);



                //Set max and min temp for after tomorrow
                const aftMax = Math.round(weatherForecast.list[16].main["temp_max"]);
                const aftMin = Math.round(weatherForecast.list[16].main["temp_min"]);

                setMaxTempAft(aftMax);
                setMinTempAft(aftMin);
 
                const afterTomorrowString = getWeatherString(afterTomorrowWeatherStatus);
        
                //Set after tomorrow icon
                switch(afterTomorrowString){
                    case "Stormy": 
                        setWeatherIconAft(Stormy);
                        break;
                    case "Rainy": 
                    setWeatherIconAft(Rainy);
                        break;
                    case "Clear": 
                    setWeatherIconAft(Sunny);
                        break;
                    case "Snowy": 
                    setWeatherIconAft(Rainy);
                        break;
                    case "Dust": 
                    setWeatherIconAft(Cloudy);
                        break;
                    case "Cloudy": 
                    setWeatherIconAft(Cloudy);
                        break;
                    default:
                    setWeatherIconAft(Sunny);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
        getForecast();
    }, [])


    //Get surfing conditions and calculate average values
    useEffect(()=> {
        const getConditions = async () => {
            try {
                const data = {  
                    "lat": latitude,
                    "lon": longitude,
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

    
                //Get spot's Swell height in [m]
                const swellHeight = forecastData["swell1_height-surface"];
                let spotSwell = averageSwell(swellHeight);
                setSwell(spotSwell);

                //Get spot's Swell period in [s]
                const swellPeriod = forecastData["swell1_period-surface"];
                let spotPeriod = averagePeriod(swellPeriod);
                setPeriod(spotPeriod);                  
            } catch (error) {
                console.log(error);
            }
        }
    
        getConditions();
    }, []);

    //Get Forecast for future days


   
  return (
    <div className='detailed-spot'>
        <h1 className='cancel' onClick={()=>{setOpenDetails(false); setOpenSmall(false);}}>X</h1>
        <div className='spot-names'>
            <p className='spot-name-description'>Spot Title</p>
            <h1 className='spot-title'>{title}</h1>
            <p className='spot-name-description'>Spot Review</p>
            <h2 className='spot-description'>{review}</h2>
            <div className='author-div'>
                <p className='written-by'>Written by</p>
                <p className='review-author'>{author}</p>
            </div>
        </div>
        <div className='spot-forecast'>
            {openRating===false && (
                <div className='rating-wrapper' onClick={()=>setOpenRating(true)}>
                    <p className='rating-name'>Rating</p>
                    <h1 className='spot-rating'>{rating}</h1>
                </div>
            )}
            
            {openRating===true && (
                <div className='rating-wrapper-rate'>
                    <p className='rate-question' onClick={()=>console.log("Open rate dialog")}>Rate Spot</p>
                    <h1 className='cancel-rate' onClick={()=>setOpenRating(false)}>Cancel</h1>
                </div>
            )}
            <div className='surf-conditions'>
                <div className='waves'>
                    <div className='upper-waves'>
                        <p className='conditions-name'>Wave Conditions</p>
                    </div>
                    <div className='bottom-waves'>
                        <div className='wave-height'>
                            <img src={Wave} className="conditions-card-icon" alt="wave"/>
                            <div className='value-div'>
                                <h1 className='conditions-value'>{swell} </h1>
                                <p className='condition-unit'>m</p>
                            </div>
                        </div>
                        <div className='period'>
                            <img src={Timer} className="conditions-card-icon" alt="wave"/>
                            <div className='value-div'>
                                <h1 className='conditions-value'>{period}</h1>
                                <p className='condition-unit'>s</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='wind'>
                    <div className='upper-wind'>
                        <p className='conditions-name'>Wind Conditions</p>
                    </div>

                    <div className='bottom-wind'>
                        <div className='wind-speed'>
                            <img src={Speed} className="conditions-card-icon" alt="wave"/>
                            
                            <div className='value-div'>
                            <h1 className='conditions-value'>{windSpeedKm}</h1>
                                <p className='condition-unit'>km/s</p>
                            </div>
                        </div>
                        <div className='wind-direction'>
                            <img src={directionIcon} alt="wind-direction" className="conditions-card-icon-direction"/>
                        </div>

                    </div>

                </div>
            </div>
            <div className='weather'>
                <div className='today'>
                    <p className='today-descriptor'>Today</p>
                    <div className='today-card'>
                        <img src={weatherIcon} className="today-weather-icon" alt="weather icon"/>
                        <div className='today-temperature'>
                            <p className='today-celsius'>Hi: {maxTemp} °C</p>
                            <p className='today-celsius'>Lo: {minTemp} °C</p>
                        </div>
                    </div>
                </div>
                <div className='upcoming'>
                        <p className='upcoming-descriptor'>Fri</p>
                        <div className='upcoming-card'>
                            <img src={weatherIconTom} className="upcoming-weather-icon" alt="weather icon"/>
                            <div className='upcoming-temperature'>
                                <p className='upcoming-celsius'>Hi: {maxTempTom} °C</p>
                                <p className='upcoming-celsius'>Lo: {minTempTom} °C</p>
                            </div>
                        </div>
                    </div>
                    <div className='upcoming'>
                        <p className='upcoming-descriptor'>Sat</p>
                        <div className='upcoming-card'>
                            <img src={weatherIconAft} className="upcoming-weather-icon" alt="weather icon"/>
                            <div className='upcoming-temperature'>
                                <p className='upcoming-celsius'>Hi: {maxTempAft} °C</p>
                                <p className='upcoming-celsius'>Lo: {minTempAft} °C</p>
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
