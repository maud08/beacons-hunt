import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import DataContext from '../context/userContext';
import {FirebaseContext} from '../firebase';

function UserFromCreate() {

    const user = useContext(DataContext);

    const firebase = useContext(FirebaseContext);

    const history = useHistory();
   
    const [userData, setUserData] = useState();

    const [error, setError] = useState('');

    const [errorPswd, setErrorPswd] = useState('');

    const [disable, setDisable] = useState(true);

    const handleForm = (event) => {
        const {name,value} = event.target;
        setUserData({
            ...userData, [name]: value
        })
        setDisable(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const {email, password, confirmPassword,pseudo} = userData;
        if(password === confirmPassword){
            firebase.signupUser(email,password)
            //création de l'user ds la collection users
            .then( authUser => {
              return firebase.user(authUser.user.uid).set({
                id: authUser.user.uid,
                pseudo,
                email,
                organizer: false
              })
            })
            .then(() => {
                setUserData({...userData});
                history.push('/')
            })
            .catch(error => {
                setError(error);
                setUserData({...userData})
            })
            user.addUser({
                ...userData
            });
        }else{
            setErrorPswd('Les mots passe ne sont pas identiques !!!')
            setUserData({...userData})
        }
        
    }

    //Gestion erreur
    const errorMsg = error !== '' && <span className="help is-danger">{error.message}</span>;
    const errorMsgPswd = errorPswd !== '' && <span className="help is-danger">{errorPswd}</span>;
    
    return (
      <>
        <form onSubmit={handleSubmit}>
            {errorMsg}
          <div className="field">
            <label className="label">Nom d'utlisateur:</label>
            <div className="control">
              <input className="input" type="text" name="pseudo" onChange={handleForm} placeholder="pseudo" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email:</label>
            <div className="control">
              <input className="input" type="text" name="email" onChange={handleForm} placeholder="Email" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Mot de passe:</label>
            <div className="control">
              <input className="input" type="password" name="password" onChange={handleForm} placeholder="mot de passe" required/>
            </div>
          </div>
          {errorMsgPswd}
          <div className="field">
            <label className="label">Confirmer mot de passe:</label>
            <div className="control">
              <input
                className= "input"
                type="password"
                name="confirmPassword"
                onChange={handleForm}
                placeholder="confirmez votre mot de passe"
                required
              />
            </div>
          </div>
          <button
            disabled={disable}
            className="button is-primary"
            type="submit"
          >
            Inscription
          </button>
        </form>
        <Link to="/login">Déjà inscrit? Connectez-vous</Link>
      </>
    );
};

export default UserFromCreate;