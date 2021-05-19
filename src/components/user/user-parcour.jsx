import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory} from "react-router-dom";
import Parcour from "../map/map-parcour";
import DataContext from '../context/userContext';
import FirebaseContext from "../context/firebaseContext";
import { LayerProvider } from '../context/layerContext';
import BeaconsNotActive from '../map/map-beacon-not-active';


function UserParcour(){

    const firebase = useContext(FirebaseContext);
    const user = useContext(DataContext);
    const history = useHistory();
    const [parcoursData,setParcoursData] = useState([]);
    const [planView, setPlanView] = useState([])
    const dataUser = user.dataUser;

    const handlePlan = (event) => {
        const plan = parcoursData.find(plan => plan.id === event.target.id)
        setPlanView(plan.data)
    }

    const handleJoin = (event) => {
        event.preventDefault();
        const idParcour = event.target.id;
        const message= "Voulez-vous commercer la partie";
        if (window.confirm(message)) {
            firebase.game({
                idItinerary: idParcour,
                idUser: dataUser.id,
                startAt: Date().toLocaleString()
            })
            history.push("/parcours/actif/" + idParcour)
        }
    }
    
    useEffect(() => {
        
            firebase.getItineraryUser(dataUser.id).then((querySnapshot) => {
                let data = []
                querySnapshot.forEach((doc) => {
                    data.push({id: doc.id, data: doc.data()})
                });
                setParcoursData(data);
            })      
        
    }, []);

    return(
        <Router basename="/parcours/mes-parcours">
        <ul className="block-list">
            {parcoursData.map(parcour => {
                return(
                    <li key={parcour.id}>
                        <h3>{parcour.data.label}</h3>
                        <Link  id={parcour.id}  className="button is-info is-small" to={"/" + parcour.id } onClick={handlePlan}>Voir</Link>
                        <button id={parcour.id} className="button is-primary is-small"  onClick={handleJoin}>Rejoindre</button>
                    </li>

                )
            })}
        </ul>
        <Switch>
            <Route exact path="/:id">
                <LayerProvider value={{planView}}>
                    <BeaconsNotActive/>
                </LayerProvider>
            </Route>
        </Switch>
        </Router>
    )
}

export default UserParcour;