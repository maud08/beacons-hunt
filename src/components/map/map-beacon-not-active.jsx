import Axios from "axios";
import React, {useEffect, useState } from "react";
import { useParams } from "react-router";
import { Map, TileLayer, Polygon } from "react-leaflet";

const URL_PARCOURS = "https://aqueous-atoll-45909.herokuapp.com/parcours/";

function BeaconsNotActive() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  const [beacons, setBeacons] = useState([]);
  const zoom = 10;
  let id = useParams();
  let polygon = [];
  let url = URL_PARCOURS + id.id;
  const purpleOptions = { color: "purple" };

  useEffect(() => {
    Axios.get(url)
      .then((reponse) => {
        setData(reponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setPosition([data.balises[0].lat, data.balises[0].lng]);
      setBeacons(data.balises);
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
