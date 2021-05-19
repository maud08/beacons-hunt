import React, { useState, useEffect, useContext, } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { FirebaseContext } from '../firebase';
import BeaconsNotActive from './map-beacon-not-active';
import { LayerProvider } from '../context/layerContext'
import DataContext from '../context/userContext';


function AllParcours(){
    
    const firebase = useContext(FirebaseContext);
    const user = useContext(DataContext);
    const [itineraries,setItineraries] = useState([]);
    const [planView, setPlanView] = useState([]);

   

    const handleParticipe = (event) => {
        event.preventDefault();
        const id = event.target.value;
        // const admin = require("firebase-admin");
        // const FieldValue = admin.firestore.FieldValue;
        // firebase.itineraryUpdate(id,{participantId: firebase.FieldValue.arrayUnion(user.dataUser.id)});
    }

    const handlePlan = (event) => {
        const plan = itineraries.find(plan => plan.id === event.target.id)
        setPlanView(plan.data)
    }


    useEffect(() => {
        firebase.getAllItineraryIsActive().then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, data: doc.data()})
            })
            setItineraries(data);    
        })
        
    }, []);
    
    return(
        // Racine du component parcours
        <Router basename="/parcours">
        <ul className="block-list">
            {itineraries.map(itinerary => {
                return(
                    <li key={itinerary.id}>
                        <h3>{itinerary.data.label}</h3>
                        <Link id={itinerary.id} className="button is-info is-small" to={"/" + itinerary.id } onClick={handlePlan}>Voir</Link>
                        <button className="button is-primary is-small" value={itinerary.id} onClick={handleParticipe}>Ajouter à ma liste</button>
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

export default AllParcours;