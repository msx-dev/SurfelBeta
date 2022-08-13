import { useEffect, useState } from "react";
import Map, {Source, Layer, Marker, Popup} from "react-map-gl";
import * as mapboxgl from 'mapbox-gl';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Surfel.css";
import {IoLocationSharp} from 'react-icons/io5';
import {GiWaveSurfer} from 'react-icons/gi';
import {format} from "timeago.js";



function Surfel() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      });
    const [pins, setPins] = useState([]);
    const [clickedId, setClickedId] = useState(null);

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
    const pinClicked = (id) => {
      console.log("Clicked!")
      console.log(id);

      setClickedId(id);
    }
      
  return (
    <div style={{ height: "100vh", width: "100%" }}>
          <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
          pitch: 0
        }}
        maxPitch={70}
        maxZoom={40}
        mapStyle="mapbox://styles/mapbox/satellite-v8"
        terrain={{source: 'mapbox-dem', exaggeration: 1}}
        //mapStyle="mapbox://styles/msude/cl0b56qxj000215qj1qgx7faq"
        //mapStyle="mapbox://styles/msude/ckwampov11d2q15odhnlp98v6"
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
                pinClicked(pin._id);
              }}>
              <IoLocationSharp color="white" size={viewport.zoom*5}/>
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
        
      </Map>
    </div>
  );
}

export default Surfel;