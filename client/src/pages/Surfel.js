import { useEffect, useState } from "react";
import Map, {Source, Layer, Marker, Popup, useMap} from "react-map-gl";
import * as mapboxgl from 'mapbox-gl';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Surfel.css";
import {IoLocationSharp} from 'react-icons/io5';
import {GiWaveSurfer} from 'react-icons/gi';
import {format} from "timeago.js";



function Surfel() {
  const {current: map} = useMap();
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
    const currentUser = "Mark";
    

    //API calls
    useEffect(()=> {
      const getPins = async () => {
        try {
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
      setViewState({...viewState, latitude: lat, longitude: long})
      setClickedId(id);
    }
    
    const addMarker = (e) => {
      console.log(e.lngLat.lng);
      const newLong = e.lngLat.lng;
      const newLat = e.lngLat.lat;
      setNewPin({
        lat: newLat,
        long: newLong
      });

    }

    const handleSubmit = () => {

    }
      
  return (
    <div style={{ height: "100vh", width: "100%" }}>
          <Map
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
        <Layer {...skyLayer} />
        {pins.map(pin =>(
          <>
            <Marker latitude={pin.lat} longitude={pin.long} onClick={e => {
                pinClicked(pin._id, pin.lat, pin.long);
              }}>
              <IoLocationSharp color= {currentUser === "Mark" ? "tomato" : "white"} size={"25"} cursor={"pointer"}/>
            </Marker>
            {pin._id === clickedId && (
              <Popup latitude={pin.lat} longitude={pin.long} anchor="left" closeOnClick={false} onClose={()=>setClickedId(null)}>
              <div className="popup">
                <label>Title</label>
                <h2>{pin.title}</h2>
                <label>Review</label>
                <h2>{pin.description}</h2>
                <label>Rating</label>
                <GiWaveSurfer/>
                <label>Info</label>
                <span>Created by <br/>{pin.username}</span>
                <span>{format(pin.createdAt)}</span>
              </div>
            </Popup>
            )}
          </>
        ))}
        {newPin && (
          <Popup latitude={newPin.lat} longitude={newPin.long} anchor="left" closeOnClick={false} onClose={()=>setNewPin(null)}>
              <div className="popup-add">
              <form onSubmit={handleSubmit}>
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
        
      </Map>
    </div>
  );
}

export default Surfel;