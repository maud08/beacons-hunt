import React, { useContext, useState } from "react";
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import LayerContext from "../context/layerContext";
import Axios from "axios";

const URL_BALISE = "http://localhost:1337/balises";

function AddMarker() {
    const map = useContext(LayerContext);
    const [markers, setMarkers] = useState([]);
    const zoom = 8;
    const idParcour = map.idParcours
    
   
    const addMarker = (e) => {
        const latlng= e.latlng;
        setMarkers([...markers, latlng]);
    }

    const handleParcours = (event) => {
        event.preventDefault();
        markers.forEach(element => {
            console.log(element)
            Axios.post(URL_BALISE,{
                lat: element.lat,
                lng: element.lng,
                parcour: idParcour.idDataParcours
            })
            .then((resp =>{
                console.log(resp)
            }))
            .catch((error)=>{
                console.log(error);
            })
        });
       
    }

    return(
        <>
            
            <button className="button is-success" onClick={handleParcours}>Valider votre parcours</button>
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
        </>
    )
}

export default AddMarker;