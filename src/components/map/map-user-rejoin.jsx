import React, {useState, useEffect, useContext, useRef, useMemo} from 'react';
import {Map,Marker,Popup, TileLayer} from 'react-leaflet';
import { useParams } from "react-router-dom";
import FirebaseContext from '../context/firebaseContext';
import {getDistance, isPointInPolygon,findNearest } from 'geolib';
import * as L from "leaflet";
import Camera from '../camera/camera';
// import DataContext from '../context/userContext';
// import LayerContext from '../context/layerContext';


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

function UserRejoin(){

    // const map = useContext(LayerContext)
    // const user = useContext(DataContext)
    const firebase = useContext(FirebaseContext);
    const [beacons, setBeacons] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [beaconsGame, setBeaconsGame] = useState([]);
    const [distanceBeacon, setDistanceBeacon ] = useState([]);
    const [picture, setPicture] = useState([]);
    const [takePicture, setTakePicture] = useState(true)
    const idParcour = useParams().id;
    const zoom = 8;
    let position = [];
    let idPosition = useRef(null) ;
    let idPositionPrevious = usePrevious(idPosition)
    const accuracy = 0.1;

    const myCustomColour = '#583470';

    const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const icon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
    })


    /**
     * UseEffect
     */

    useEffect(() => {
        firebase.getItinerary(idParcour).then((doc) => {
            if (doc.exists) {
                setBeacons(doc.data().beacons);
            } else {
                console.log("No such document !");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
        
    }, [])

    if(beacons !==undefined){
        position = beacons[0];
    }

    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24, // 24 hour
    };

    const succes = (position) => {
        setCurrentPosition({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
    }

    const error = (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    const cancelLocationWatch = () => {
        const {geolocation} = navigator;
        if(idPosition.current && geolocation){
            geolocation.clearWatch(idPosition.current);
        }
    }


    useEffect(() => {
        const {geolocation} = navigator;
        idPosition.current = geolocation.watchPosition(succes,error,geolocationOptions);
        return cancelLocationWatch;

    },[])

    useEffect(() => {
        if(beacons.length > 0){
            // const isFound = [beacons].includes({lng: 4.3589328139708, lat: 50.46865089156695})
            // console.log("is====",isFound)
            // // beacons.some(item => shallowEqual(item, currentPosition));
            beacons.map((beacon,idx) => {
                if(getDistance((beacon), currentPosition) <= 10){
                    
                    setTakePicture(true);
                }
            })            
        }

    },[currentPosition])

    


    return(
        <>
        {
            takePicture &&
            <>
               <Camera/> 
            </>
        }
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
            
                {currentPosition  && 
                    <>
                    
                        <Marker key={`marker-your-position`} position={currentPosition} className="my-custom-pin" icon={icon}>
                            <Popup>
                                <span>Your position</span>
                            </Popup>
                        </Marker>
                    
                    </>
                }
                
            </Map>
        }
        </>
        
    )
}

export default UserRejoin;