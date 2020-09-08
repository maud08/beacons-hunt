import React, { useState, useContext} from 'react';
import DataContext from '../context/userContext';
import Axios from 'axios';

const URL_USER = "http://localhost:1337/users";

function UserFromCreate() {

    const user = useContext(DataContext);

    const [userData, setUserData] = useState();

    const handleForm = (event) => {
        const {name,value} = event.target;
        setUserData({
            ...userData, [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        user.addUser({
            ...userData
        });
        Axios.post(URL_USER,{...userData})
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
 
    
    return(
        <form onSubmit={handleSubmit}>
            <div>
            <label className="has-text-danger">Nom d'utlisateur:</label>
            <input type="text" name="username" onChange={handleForm}/>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" onChange={handleForm}/>
            </div>
            <div>
                <label>Mot de passe:</label>
                <input type="password" name="password" onChange={handleForm}/>
            </div>
            <button className="button is-primary" type="submit">Inscription</button>
        </form>
    )
};

export default UserFromCreate;