import React, {useState, useEffect, useContext} from 'react';
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import { useParams } from "react-router-dom";
import FirebaseContext from '../context/firebaseContext';
// import DataContext from '../context/userContext';
// import LayerContext from '../context/layerContext';

function UserRejoin(){

    // const map = useContext(LayerContext)
    // const user = useContext(DataContext)
    const firebase = useContext(FirebaseContext);
    const [beacons, setBeacons] = useState([])
    const [currentPosition, setCurrentPosition] = useState([])
    const idParcour = useParams().id;
    const zoom = 8;
    let position = [];

    useEffect(() => {
        firebase.getItinerary(idParcour).then((doc) => {
            if (doc.exists) {
                console.log(doc.data().beacons);
                setBeacons(doc.data().beacons);
            } else {
                console.log("No such document !");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
        
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition([{
                    "lat": position.coords.latitude,
                    "lng": position.coords.longitude
                }])
        });
    }, [idParcour]);


    if(beacons !==undefined){
        position = beacons[0];
        if(currentPosition !== null){
            /* setBeacons([...beacons,currentPosition]) */
            console.log("beacons",beacons)
            console.log("current",currentPosition)
        }
    }

    return(
        <>
        {beacons !== undefined && 
            <Map center={position} zoom={zoom} className="map">
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                {beacons.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}>
                    </Marker>
                )}
                 {currentPosition.length > 0  && 
                <>
                {currentPosition.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position} style={{ color: 'red' }} className="icon">
                        <Popup>
                            <span>Your position</span>
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