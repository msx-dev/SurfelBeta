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



function Surfel() {
  const storedData = window.localStorage;
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      });
    const [pins, setPins] = useState([]);
    const [clickedId, setClickedId] = useState(null);
    const [newPin, setNewPin] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [currentUser, setCurrentUser] = useState(storedData.getItem("user"));
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
      console.log(e);
      const newLong = e.lngLat.lng;
      const newLat = e.lngLat.lat;
      setNewPin({
        lat: newLat,
        long: newLong
      });
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
          t
      >
      <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          
        />
        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX} position="top-left" />
      <NavigationControl visualizePitch="true" showCompass="true" showZoom="true"/>
      <GeolocateControl/>
        <Layer {...skyLayer} />
        {pins.map(pin =>(
          <>
            <Marker latitude={pin.lat} longitude={pin.long} onClick={e => {
                pinClicked(pin._id, pin.lat, pin.long);
              }}>
              <IoLocationSharp color= {currentUser === pin.username ? "tomato" : "white"} size={"25"} cursor={"pointer"}/>
            </Marker>
            {pin._id === clickedId && (
              <Popup latitude={pin.lat} longitude={pin.long} anchor="left" closeOnClick={false} onClose={()=>setClickedId(null)}>
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
        {(newPin && currentUser) && (
          <Popup latitude={newPin.lat} longitude={newPin.long} anchor="left" closeOnClick={false} onClose={()=>setNewPin(null)}>
              <div className="popup-add">
              <form onSubmit={(e)=> handleSubmit(e)}>
                  <label>Title</label>
                  <input placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                  <label>Review</label>
                  <input placeholder="review" onChange={(e) => setReview(e.target.value)}/>
                  <label>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit">Add</button>
                </form>
                <GiWaveSurfer/>
              </div>
            </Popup>
        )}
        {currentUser ? (<button className="button" onClick={handleLogout}>Log Out</button>) 
        : (
          <div>
            <button className="button" onClick={()=>{setLogin(true); setRegister(false);}}>Login</button>
            <button className="button" onClick={()=>{setRegister(true); setLogin(false);}}>Register</button>
          </div>
        )}
        {register && (
          <Register setRegister={setRegister} storedData={storedData} setCurrentUser={setCurrentUser}/>
        )}
        {login && (
          <Login storedData={storedData} setCurrentUser={setCurrentUser} setLogin={setLogin}/>
        )}
        
      </Map>
    </div>
  );
}

export default Surfel;