import React, {useContext, useEffect, useState } from "react";
import { Map, TileLayer, Polygon } from "react-leaflet";
import LayerContext from "../context/layerContext";

function BeaconsNotActive() {
  const plan = useContext(LayerContext);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  const [beacons, setBeacons] = useState([]);

  //LAYER
  const zoom = 10;
  let polygon = [];
  const purpleOptions = { color: "purple" };

  //USEEFFECT
  useEffect(() => {
    setData(plan.planView.beacons)
  },[])

  useEffect(() => {
    if (data.length !== 0) {
      setPosition([data[0].lat, data[0].lng]);
      setBeacons(data);
    }
  }, [data]);

  useEffect(() => {
    polygon.push(beacons.map((position) => [position.lat, position.lng]));
  }, [beacons]);


  return (
    <>
      {position.length !== 0 && (
        <Map center={position} zoom={zoom} className="map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polygon pathOptions={purpleOptions} positions={polygon} />
        </Map>
      )}
    </>
  );
}

export default BeaconsNotActive;
