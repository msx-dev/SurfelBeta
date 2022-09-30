import "./AdminPanel.css";

import React, { useEffect, useRef, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import PopupContent from "../../components/Popup/PopupContent";
import SpotDetailed from "../../components/DetailedSpot/SpotDetailed";
import Map, {Source, Layer, Marker, Popup, useMap, NavigationControl, GeolocateControl} from "react-map-gl";
import GeocoderControl from "../../components/GeoCoder/GeocoderControl";
import axios from "axios";
import UserNavbar from "../../components/Navigation/UserNavbar";
import NearbySpots from "../../components/Nearby/NearbySpots/NearbySpots";
import ReportedSpots from "../../components/ReportedSpots/ReportedSpots";
import UserChart from "../../components/Charts/UserCharts/UserChart";
import PinChart from "../../components/Charts/PinCharts/PinChart";
import AdminStats from "../../components/AdminStats/AdminStats";

export default function AdminPanel({handleLogout}) {
  const storedData = window.localStorage;
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
        width: "80vw",
        height: "500px",
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

    useEffect(()=> {
      const getPins = async () => {
        try {
          const response = await axios.get("pins/reportedPins");
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
      mapRef.current?.flyTo({center: [long, lat], duration: 2000});
      setClickedId(id);
      setOpenSmall(true);
      setOpenDetails(false);
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
    
    

  return (
    <div className="admin-wrapper">
      <h1>Admin Panel</h1>
      <button onClick={()=>handleLogout()}>Log Out</button>
      <AdminStats/>
      <div className="admin-map-div">
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
          
          <Layer {...skyLayer} />

          
          {/* Displaying Pins */}
            
              {pins.map(pin =>(
                <>
                  <Marker key={pin._id} latitude={pin.lat} longitude={pin.long} onClick={e => {
                      pinClicked(pin._id, pin.lat, pin.long);
                    }}>
                    <IoLocationSharp key={pin._id} color= {currentUser === pin.username ? "white" : "#d27e7c"} size={"25"} cursor={"pointer"}/>
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
            
            

            <ReportedSpots setOpenNearby={setOpenNearby} viewState={viewState} pinClicked={pinClicked}/>
 
          </Map>
          
          <UserChart/>
          <PinChart/>
      
      </div>
    </div>
  )
}
