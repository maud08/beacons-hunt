import React, { useContext, useState } from "react";
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import LayerContext from "../context/layerContext";

function AddMarker() {
    const map = useContext(LayerContext);
    const [markers, setMarkers] = useState([]);
    const zoom = 8;
   
    const addMarker = (e) => {
        const latlng= e.latlng;
        setMarkers([...markers, latlng ]);
        console.log(markers);
    }
    return(
        <Map center={map.points} zoom={zoom} onclick={addMarker}>
           <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((position, idx) =>
                <Marker key={`marker-${idx}`} position={position}>
                    <Popup>
                        <span>Popup</span>
                    </Popup>
                </Marker>
            )}
        </Map>
    )
}

export default AddMarker;