import React, {useContext, useEffect, useState} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import LayerContext from "../context/layerContext";
import { FirebaseContext } from "../firebase";

function AddParcours() {
    const zoom = 8;
    const map = useContext(LayerContext);
    const firebase = useContext(FirebaseContext);
    const [markers, setMarkers] = useState([]);
    const [data, setData] = useState();

    // HANDLER
    const handleForm = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setData({
            ...data,
            [name]: value
        });
    };
    const handleMarker = (e) => {
        const latlng = e.latlng;
        setMarkers([
            ...markers,
            latlng
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // il faut transformer le tableau en pure tableau d'objet javascript
        const beacons = markers.map((obj) => {return Object.assign({},obj)});
        const {label,isActive} = data;
        firebase.itinerary({
            label,
            isActive,
            beacons
        })
    };

    // USEEFFECT
    useEffect(() => {},[])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Label</label>
                    <div className="control">
                        <input name="label" className="input" type="text" placeholder="Nom de votre parcours"
                            onChange={handleForm}/>
                    </div>
                </div>
                <label className="checkbox">
                    <input name="isActive" type="checkbox" onChange={handleForm} />
                    Activer le parcour
                </label>
                <button className="button is-success">Valider votre parcours</button>
            </form>
            <Map center={
                    map.points
                }
                zoom={zoom}
                onclick={handleMarker}>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {
                markers.map((position, idx) => (
                    <Marker key={
                            `marker-${idx}`
                        }
                        position={position}>
                        <Popup>
                            <span>Popup</span>
                        </Popup>
                    </Marker>
                ))
            } </Map>
        </>
    );
}

export default AddParcours;
