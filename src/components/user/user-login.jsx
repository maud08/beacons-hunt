import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/userContext';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../firebase';



function Login(){

    const [userData, setUserData] = useState('');
    const [error, setError] = useState('');
    const firebase = useContext(FirebaseContext);
    
    let history = useHistory();

    const handleForm = (event) => {
        const {name, value} = event.target;
        setUserData({
            ...userData, [name]: value
        })
    };

    // useEffect(() => {
    //     Axios.get(URL_USER)
    //         .then(({data})=> {
    //             setUsersData(data)
    //         })
    //         .catch((error)=> {
    //             console.log(error);
    //         })
        
    // },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.loginUser(userData.email,userData.password)
        .then(user =>{
            history.push("/parcours");
        })
        .catch(error => {
            setError(error)
            setUserData('');
        })
        
    }
    return(
        <>
        {error !== '' && <span>{error.message}</span>}
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