import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';

const URL_PARCOUR = "https://aqueous-atoll-45909.herokuapp.com/parcours/";

function Parcour(){
    const [data,setData]= useState();
    const zoom = 8;
    let position= [];
    let markers= [];
    let id = useParams()

    useEffect(() =>{
        Axios.get(URL_PARCOUR + id.id)
        .then(({data}) =>{
            setData(data)
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[id.id]);
    if(data !== undefined){
        position = data.balises[0];
        markers = data.balises;
    }
    return(
        <>
        {data !== undefined && 
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
            </Map>
        }
        </>
        
    )
}

export default Parcour;