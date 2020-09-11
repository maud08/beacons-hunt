import React, {useContext, useState, useEffect} from 'react';
import {Map,Marker,Popup, TileLayer, useLeaflet} from 'react-leaflet';
import LayerContext from '../context/layerContext';

function MapView() {
    /* const [mapData, setMapData] = useState({lat: 51.505,lng: -0.09,zoom:13}); */
    const point = useContext(LayerContext)
    const position = [50.83772875638055,4.389038085937501];
    const zoom = 8;
    
    return ( 
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
      </Map>
  
      
    );
  }

  export default MapView;
  