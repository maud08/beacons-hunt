import React, { useState, useContext} from 'react';
import Axios from 'axios';
import LayerContext from '../context/layerContext';
import AddMarker from './map-add-marker';

const URL_PARCOURS = "http://localhost:1337/parcours";
let idDataParcours= null;


function AddParcours() {

    const parcours =  useContext(LayerContext);
    const [parcoursData, setParcoursData] = useState();
    const [isSubmit,setSubmit] = useState({submit:false});
    const [idParcours,setIdParcours] = useState();

    const handleForm = (event) => {
        const {name,value} = event.target;
        setParcoursData({
            ...parcoursData, [name]: value
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        parcours.addParcours({
            ...parcoursData
        });
        Axios.post(URL_PARCOURS,{...parcoursData})
        .then((resp) => {
           idDataParcours = resp.data.id;
           setSubmit({
                submit: true
           });
           if(idParcours !==null){
            parcours.addIdParcours({
                ...idParcours,idDataParcours
            })
        }
           
        })
        .catch((error)=>{
            console.log(error);
        });
        
        
       
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="field">
                <label className="label">Label</label>
                <div className="control">
                    <input name="Label" className="input" type="text" placeholder="Nom de votre parcours" onChange={handleForm}/>
                </div>
                </div>
                <div className="control">
                    <button className="button is-link">Ajouter</button>
                </div>
            </form>
        {isSubmit.submit === true && (
            <AddMarker/>
        )}
        </>
    )
}

export default AddParcours;