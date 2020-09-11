import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import Axios from 'axios'; 
import Parcour from "./map-parcour";
import DataContext from '../context/userContext';

const URL_PARCOURS= "https://aqueous-atoll-45909.herokuapp.com/parcours/";

function AllParcours(){
    const [parcoursData,setData] = useState([]);
    let [participant,setParticipant] = useState();
    const user = useContext(DataContext);
    const dataUser = user.dataUser;
    useEffect(() => {
        Axios.get(URL_PARCOURS)
        .then(({data}) => {
            setData(data)
        })
        .catch((error)=>{
            console.log(error)
        });
        if(dataUser  !== undefined){
            const roles = dataUser.role_users;
            const role = roles.find(role => role.label === "participant");
            if(role !== undefined ){
                participant = true;
                setParticipant(participant);
            }
            
        }
        
    }, []);
    
    const handleParticipe = (event) => {
        event.preventDefault();
        const id = event.target.value;
        Axios.put(URL_PARCOURS + id,{
            user: dataUser.id
        })
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return(
        <Router basename="/parcours/:id">
        <ul className="block-list">
            {parcoursData.map(parcour => {
                return(
                    <li key={parcour.id}>
                        <h3>{parcour.Label}</h3>
                        <Link className="button is-info is-small" to={"/parcours/" + parcour.id }>Voir</Link>
                        {participant === true &&
                        <button className="button is-primary is-small" value={parcour.id} onClick={handleParticipe}>Ajouter à ma liste</button>
                    }
                    </li>
                )
            })}
        </ul>
        <Switch>
            <Route exact path="/parcours/:id">
                <Parcour/>
            </Route>
        </Switch>
        
        </Router>
    )
}

export default AllParcours;