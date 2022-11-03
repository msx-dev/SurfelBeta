import { useEffect, useRef, useState } from "react";
import Map, {Source, Layer, Marker, Popup, useMap, NavigationControl, GeolocateControl} from "react-map-gl";
import * as mapboxgl from 'mapbox-gl';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Surfel.css";
import {IoLocationSharp} from 'react-icons/io5';
import Register from "../../components/Authentication/Register/Register";
import Login from "../../components/Authentication/Login/Login";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import GeocoderControl from "../../components/GeoCoder/GeocoderControl";
import UserNavbar from "../../components/Navigation/UserNavbar";
import NewSurfSpot from "../../components/NewSpot/NewSurfSpot";
import SpotDetailed from "../../components/DetailedSpot/SpotDetailed";
import PopupContent from "../../components/Popup/PopupContent";
import NearbySpots from "../../components/Nearby/NearbySpots/NearbySpots";
import AdminPanel from "../AdminPanel/AdminPanel";
import ReactMapGL from "react-map-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

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
    const [openDetails, setOpenDetails] = useState(false);
    const [openSmall, setOpenSmall] = useState(false);
    const [admin, setAdmin] = useState(storedData.getItem("admin_key"));
    const [openNearby, setOpenNearby] = useState(false);

    

    //API calls
    useEffect(()=> {
      const getPins = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/pins");
          setPins(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getPins();
    }, [])

    


    useEffect(()=> {
      if(mapView === null){
        setMapStyle("mapbox://styles/mapbox/satellite-v8");
      }else if(mapView === "satellite"){
        setMapStyle("mapbox://styles/mapbox/satellite-v8");
      }else if(mapView==="cartoon"){
        setMapStyle(process.env.REACT_APP_COLORVIEW);
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
      if(window.innerWidth < 418){
        mapRef.current?.flyTo({center: [long, lat-0.003], duration: 2000});
      }
      else{
        mapRef.current?.flyTo({center: [long, lat], duration: 2000});
      }
      setClickedId(id);
      setOpenSmall(true);
      setOpenDetails(false);
      console.log(window.innerWidth)
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
      storedData.removeItem("admin_key");
      storedData.removeItem("user_type");
      setCurrentUser(null);
      setAdmin(null);
    }

      
  return (
    <div style={{ height: "100vh", width: "100%" }}>
    {!admin && (<Map
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
                <IoLocationSharp key={pin._id} color= {currentUser === pin.username ? "#f5d95d" : "#d27e7c"} size={"25"} cursor={"pointer"}/>
              </Marker>
              {(pin._id === clickedId) && openSmall===true && (
              <div>
                <Popup key={pin._id} latitude={pin.lat} longitude={pin.long} anchor="left" closeOnClick={false} onClose={()=>setClickedId(null)}>
                  <PopupContent title={pin.title} rating={pin.rating} key={pin._id} setOpenDetails={setOpenDetails} setOpenSmall={setOpenSmall}/>
                </Popup>
              </div>
              )}
             {openDetails && (pin._id === clickedId) && (<SpotDetailed storedData={storedData} pinId={pin._id} latitude={pin.lat} longitude={pin.long} setOpenSmall={setOpenSmall} setOpenDetails={setOpenDetails} rating={pin.rating} title={pin.title} review={pin.description} author={pin.username}/>)}

            
            </>
          ))}
        </>
        ) : <></>}
        
      

      {/* Adding New Pin */}
      {(newPin && currentUser && (!newSpot)) && (
        <Popup latitude={newPin.lat} longitude={newPin.long} anchor="left" closeOnClick={false} onClose={()=>setNewPin(null)}>
          <div className="popup-content">
            <buton onClick={()=>setNewSpot(true)} className="add-pin-button">Add Pin Here?</buton>
            <buton onClick={() => setNewPin(null)} className="cancel-pin-button">Cancel</buton>
          </div>
          </Popup>
      )}

      {/* New Pin Details Insert */}
      {newPin && currentUser && newSpot && (
        <NewSurfSpot storedData={storedData} setPins={setPins} pins={pins} newPin={newPin} setNewPin={setNewPin} setNewSpot={setNewSpot}/>
      )}

      {/* Nearby Spots */}
      {openNearby && (
        <NearbySpots setOpenNearby={setOpenNearby} viewState={viewState} pinClicked={pinClicked}/>
      )}


      {/* User Navigation */}
      {currentUser ? (
        <UserNavbar avatar={avatar} setMapView={setMapView} handleLogout={handleLogout} storedData={storedData} setMapStyle={setMapStyle} setOpenNearby={setOpenNearby}/>
        ) 
      : (
        <div className="user-login-register">
          <button className="button-login" onClick={()=>{setLogin(true); setRegister(false);}}>Login</button>
          <button className="button-register" onClick={()=>{setRegister(true); setLogin(false);}}>Register</button>
        </div>
      )}
      {register && (
        <Register 
          setRegister={setRegister} 
          storedData={storedData} 
          setCurrentUser={setCurrentUser} 
          setAvatar={setAvatar}
        />
      )}
      {login && (
        <Login 
          storedData={storedData} 
          setCurrentUser={setCurrentUser} 
          setLogin={setLogin} 
          setAvatar={setAvatar} 
          setAdmin={setAdmin}
        />
      )}
        
      </Map>)}
      {admin===process.env.REACT_APP_ADMIN_KEY && (
        <AdminPanel handleLogout={handleLogout}/>
      )}
    </div>
  );
}

export default Surfel;