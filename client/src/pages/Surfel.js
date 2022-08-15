import { useEffect, useRef, useState } from "react";
import Map, {Source, Layer, Marker, Popup, useMap, NavigationControl, GeolocateControl} from "react-map-gl";
import * as mapboxgl from 'mapbox-gl';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Surfel.css";
import {IoLocationSharp} from 'react-icons/io5';
import {GiWaveSurfer} from 'react-icons/gi';
import {format} from "timeago.js";
import Register from "../components/Register";
import Login from "../components/Login";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import GeocoderControl from "../components/GeocoderControl";

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
import NewSpot from "../components/NewSpot";



function Surfel() {
  const storedData = window.localStorage;
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 29.116021063495054,
        longitude: -13.553147307415657,
        zoom: 14,
        pitch: 67,
        bearing: 50
      });
    const [pins, setPins] = useState([]);
    const [clickedId, setClickedId] = useState(null);
    const [newPin, setNewPin] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [newSpot, setNewSpot] = useState(false);
    const [currentUser, setCurrentUser] = useState(storedData.getItem("user"));
    const [avatar, setAvatar] = useState(storedData.getItem("avatar"));
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    

    //API calls
    useEffect(()=> {
      const getPins = async () => {
        try {
          console.log("here ok")
          const response = await axios.get("/pins");
          setPins(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }

      getPins();
    }, [])


    //Map Layers
    const skyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [2.4, 0.0],
        'sky-atmosphere-sun-intensity': 50
    }
    };

    //Functions
    const pinClicked = (id, lat, long) => {
      //setViewState({...viewState, latitude: lat, longitude: long});
      mapRef.current?.flyTo({center: [long, lat], duration: 2000});
      setClickedId(id);
    }
    
    const addMarker = (e) => {
      if(currentUser){
        const newLong = e.lngLat.lng;
        const newLat = e.lngLat.lat;
        setNewPin({
          lat: newLat,
          long: newLong
        });
      }else{
        setLogin(true);
      }
      
    }

    const handleSubmit = async (e) => {
      console.log(newPin.lat)
      e.preventDefault();
      const savePin = {
        username: currentUser,
        description: review,
        rating: rating,
        lat: newPin.lat,
        long: newPin.long,
        title: title,
        all_ratings: 1,
        all_ratings_sum: rating
      }

      try {
        const response = await axios.post("/pins", savePin);
        console.log(response.data)
        setPins([...pins, response.data]);
        setNewPin(null);
      } catch (error) {
        console.log(error);
      }
    }

    const handleLogout = () => {
      storedData.removeItem("user");
      storedData.removeItem("u_id");
      setCurrentUser(null);
    }

      
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
          pitch: 0
        }}
        maxPitch={70}
        transitionDuration = "500"
        maxZoom={40}
        mapStyle="mapbox://styles/mapbox/satellite-v8"
        terrain={{source: 'mapbox-dem', exaggeration: 1}}
        //mapStyle="mapbox://styles/msude/cl0b56qxj000215qj1qgx7faq"
        //mapStyle="mapbox://styles/msude/ckwampov11d2q15odhnlp98v6"
        onDblClick={(e)=>addMarker(e)}
        doubleClickZoom={false}
        
      >
      <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          
        />

      
      {/* Map Controls and Layers*/}
      <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX} position="top-left" />
      <NavigationControl visualizePitch="true" showCompass="true" showZoom="true"/>
      <GeolocateControl trackUserLocation="true" showUserLocation="true"/>
      <Layer {...skyLayer} />

      
      {/* Displaying Pins */}
        {(viewState.zoom > 10) ? (
          <>
          {pins.map(pin =>(
            <>
              <Marker key={pin._id} latitude={pin.lat} longitude={pin.long} onClick={e => {
                  pinClicked(pin._id, pin.lat, pin.long);
                }}>
                <IoLocationSharp key={pin._id} color= {currentUser === pin.username ? "tomato" : "white"} size={"25"} cursor={"pointer"}/>
              </Marker>
              {pin._id === clickedId && (
                <Popup key={pin._id} latitude={pin.lat} longitude={pin.long} anchor="left" closeOnClick={false} onClose={()=>setClickedId(null)}>
                <div className="popup">
                  <label>Title</label>
                  <h2>{pin.title}</h2>
                  <label>Review</label>
                  <h2>{pin.description}</h2>
                  <label>Rating</label>
                  {Array(pin.rating).fill(<GiWaveSurfer/>)}
                  <label>Info</label>
                  <span>Created by <br/>{pin.username}</span>
                  <span>{format(pin.createdAt)}</span>
                </div>
              </Popup>
              )}
            </>
          ))}
        </>
        ) : <></>}
        
      

      {/* Adding New Pin */}
      {(newPin && currentUser && (!newSpot)) && (
        <Popup latitude={newPin.lat} longitude={newPin.long} anchor="left" closeOnClick={false} onClose={()=>setNewPin(null)}>
            <buton onClick={() => setNewSpot(true)}>Add Pin Here?</buton>
            <buton onClick={() => setNewPin(null)}>Cancel</buton>
            {/* */}
          </Popup>
      )}
      {newPin && currentUser && newSpot && (
        <NewSpot storedData={storedData} setPins={setPins} pins={pins} newPin={newPin} setNewPin={setNewPin}/>
      )}

      

      {/* User Navigation */}
      {currentUser ? (
        <div className="user-controls">
          {avatar===2 ? (
            <img className="avatar-dropdown" src={Avatar2}/>
          ) : (
            <img src={Avatar1}/>
          )}
          <button className="button" onClick={handleLogout}>Log Out</button>
        </div>
        ) 
      : (
        <div className="user-login-register">
          <button className="button" onClick={()=>{setLogin(true); setRegister(false);}}>Login</button>
          <button className="button" onClick={()=>{setRegister(true); setLogin(false);}}>Register</button>
        </div>
      )}
      {register && (
        <Register setRegister={setRegister} storedData={storedData} setCurrentUser={setCurrentUser} setAvatar={setAvatar}/>
      )}
      {login && (
        <Login storedData={storedData} setCurrentUser={setCurrentUser} setLogin={setLogin} setAvatar={setAvatar}/>
      )}
        
      </Map>
    </div>
  );
}

export default Surfel;