import { useState } from "react";
import Map, {Source, Layer} from "react-map-gl";
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Surfel.css";


function Surfel() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      });

    const skyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [2.4, 0.0],
        'sky-atmosphere-sun-intensity': 50
    }
    };
      
  return (
    <div style={{ height: "100vh", width: "100%" }}>
          <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
          pitch: 80
        }}
        maxPitch={85}
        maxZoom={50}
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
          maxzoom={14}
        />
          <Layer {...skyLayer} />
      </Map>
    </div>
  );
}

export default Surfel;