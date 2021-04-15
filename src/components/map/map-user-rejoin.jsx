// import React, {useState, useEffect, useContext} from 'react';
import React, {useState, useEffect} from 'react';
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import Axios from "axios";
import { useParams } from "react-router-dom";
// import DataContext from '../context/userContext';
// import LayerContext from '../context/layerContext';

const URL_PARCOUR = "https://aqueous-atoll-45909.herokuapp.com/parcours/";

function UserRejoin(){
    // const map = useContext(LayerContext)
    // const user = useContext(DataContext)
    const [markers, setMarkers] = useState([])
    const [currentPosition, setCurrentPosition] = useState([])
    const id = useParams();
    const idParcour = id.id;
    const zoom = 8;
    let position = [];

    useEffect(() => {
        Axios.get(URL_PARCOUR + idParcour)
        .then(({data}) => {
            setMarkers(data.balises)
           
        })
        .catch((error)=> {
            console.log("error",error)
        });
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition([{"lat":position.coords.latitude,"lng":position.coords.longitude}])
        });
    }, [idParcour]);

    if(markers !==undefined){
        position = markers[0];
        if(currentPosition !== null){
            /* setMarkers([...markers,currentPosition]) */
            console.log("markers",markers)
            console.log("current",currentPosition)
        }
    }

    
   
    return(
        <>
        {markers !== undefined && 
            <Map center={position} zoom={zoom} className="map">
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
                 {currentPosition.length > 0  && 
                <>
                {currentPosition.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                            <span>Current</span>
                        </Popup>
                    </Marker>
                )}
                </>
                }
            </Map>
        }
        </>
        
    )
}

export default UserRejoin;