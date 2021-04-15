import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/userContext';
import Axios from 'axios';
import { useHistory } from 'react-router';
const URL_USER = "https://aqueous-atoll-45909.herokuapp.com/users";

function Login(){
    const userContext = useContext(DataContext);
    const [userData, setUserData] = useState();
    const [usersData, setUsersData] = useState();
    
    let history = useHistory();

    const handleForm = (event) => {
        const {name, value} = event.target;
        setUserData({
            ...userData, [name]: value
        })
    };

    useEffect(() => {
        Axios.get(URL_USER)
            .then(({data})=> {
                setUsersData(data)
            })
            .catch((error)=> {
                console.log(error);
            })
        
    },[]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if(usersData !== undefined){
            const user = usersData.find(user => user.email === userData.email);
            if(user !== undefined ){
                userContext.addIdUser({
                    ...user
                });
                history.push("/parcours")
            }
        }
        
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input type="text" name="email" onChange={handleForm}/>
        </div>
        <div>
            <label>Mot de passe:</label>
            <input type="password" name="password" onChange={handleForm}/>
        </div>
        <button className="button is-primary" type="submit">Connexion</button>
        
    </form>
    </>
    );
    
};

export default Login;