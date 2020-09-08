import React, {useContext} from 'react';
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import LayerContext from '../context/layerContext';

function MapView() {
    /* const [mapData, setMapData] = useState({lat: 51.505,lng: -0.09,zoom:13}); */
    const point = useContext(LayerContext)
    const position = [48.865572, 2.283523];
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