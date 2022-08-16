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
import Avatar10 from "../public/avatars/10.svg";


import NewSpot from "../components/NewSpot";
import UserNavbar from "../components/UserNavbar";
import NewSurfSpot from "../components/NewSurfSpot";
import SpotDetailed from "../components/SpotDetailed";
import PopupContent from "../components/PopupContent";



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
    const [newSpot, setNewSpot] = useState(false);
    const [currentUser, setCurrentUser] = useState(storedData.getItem("user"));
    const [avatar, setAvatar] = useState(parseInt(storedData.getItem("avatar")));
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [mapView, setMapView] = useState(storedData.getItem("mapView"));
    const [mapStyle, setMapStyle] = useState();

    

    //API calls
    useEffect(()=> {
      const getPins = async () => {
        try {
          const response = await axios.get("/pins");
          setPins(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(process.env.REACT_APP_WEATHERAPI)
      getPins();
    }, [])


    useEffect(()=> {
      if(mapView === null){
        console.log("Mapstyle is null!")
        setMapStyle("mapbox://styles/mapbox/satellite-v8");
      }else if(mapView === "satellite"){
        setMapStyle("mapbox://styles/mapbox/satellite-v8");
      }else if(mapView==="cartoon"){
        setMapStyle("mapbox://styles/msude/cl0b56qxj000215qj1qgx7faq");
      }else{
        console.log("Hmm")
      }
    }, [mapView])


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

    
    const handleLogout = () => {
      storedData.removeItem("user");
      storedData.removeItem("u_id");
      storedData.removeItem("avatar");
      storedData.removeItem("mapView");
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
        mapStyle={mapStyle}
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
                <PopupContent title={pin.title} rating={pin.rating} key={pin._id}/>
                </Popup>
              )}
            </>
          ))}
        </>
        ) : <></>}

        <SpotDetailed/>
        
      

      {/* Adding New Pin */}
      {(newPin && currentUser && (!newSpot)) && (
        <Popup latitude={newPin.lat} longitude={newPin.long} anchor="left" closeOnClick={false} onClose={()=>setNewPin(null)}>
            <buton onClick={() => {setNewSpot(true)}}>Add Pin Here?</buton>
            <buton onClick={() => setNewPin(null)}>Cancel</buton>
            {/* */}
          </Popup>
      )}
      {newPin && currentUser && newSpot && (
        <NewSurfSpot storedData={storedData} setPins={setPins} pins={pins} newPin={newPin} setNewPin={setNewPin} setNewSpot={setNewSpot}/>
      )}


      {/* User Navigation */}
      {currentUser ? (
        <UserNavbar avatar={avatar} setMapView={setMapView} handleLogout={handleLogout} storedData={storedData} setMapStyle={setMapStyle}/>
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