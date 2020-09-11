import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Axios from 'axios'; 
import Parcour from "../map/map-parcour";

import DataContext from '../context/userContext';

const URL_PARCOURS= "https://aqueous-atoll-45909.herokuapp.com/users/";

function UserParcour(){
    const [parcoursData,setData] = useState([]);
    let [participant,setParticipant] = useState();
    const user = useContext(DataContext);
    const dataUser = user.dataUser;
    useEffect(() => {
        Axios.get(URL_PARCOURS + dataUser.id)
        .then(({data}) => {
            setData(data.Userparcours)
        })
        .catch((error)=>{
            console.log(error)
        });
        if(dataUser  !== undefined){
            const roles = dataUser.role_users;
            const role = roles.find(role => role.label === "participant");
            if(role !== undefined ){
                setParticipant(participant);
            }
            
        }
        
    }, []);
    return(
        <Router basename="/">
        <ul className="block-list">
            {parcoursData.map(parcour => {
                return(
                    <li key={parcour.id}>
                        <h3>{parcour.Label}</h3>
                        <Link className="button is-info is-small" to={"/parcours/" + parcour.id }>Voir</Link>
                        <a className="button is-primary is-small" Href={"/parcours/actif/" + parcour.id }>Rejoindre</a>
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

export default UserParcour;