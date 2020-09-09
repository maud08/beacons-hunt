import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const URL_PARCOURS= "http://localhost:1337/parcours";

function AllParcours(){
    const [parcoursData,setData] = useState([]);

    useEffect(() => {
        Axios.get(URL_PARCOURS)
        .then(({data}) => {
            setData(data)
            /* setData([{...data}]) */
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])
    console.log("parcours",parcoursData);
    return(
        <>
        {parcoursData.map((parcour) => (
            <ul>
                <li key={parcour.id}>{parcour.Label}</li>
            </ul>
        ))
          
        }
        
        </>
    )
}

export default AllParcours;