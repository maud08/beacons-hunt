/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import './App.scss';
import {DataProvider} from "./components/context/userContext";
import {LayerProvider} from "./components/context/layerContext";
import UserFromCreate from './components/user/user-from-create';
import MapView from './components/map/map-view';
import AddMarker from './components/map/map-add-marker';
import AddParcours from './components/map/map-add-parcours';
import AllParcours from './components/map/map-all-parcours';
import Login from './components/user/user-login';
import UserParcour from './components/user/user-parcour';
import UserRejoin from "./components/map/map-user-rejoin";
import { FirebaseContext } from './components/firebase';
import { SessionProvider } from './components/context/sessionContext';
import UserProfile from './components/user/user-profile';

function App() {

  const [dataUser, setDataUser] = useState();
  const [points, setPoints] = useState([50.83772875638055,4.389038085937501]);
  const [parcours, setParcours] = useState();
  const [idParcours, setIdParcours] = useState();
  const [organisateur, setOrganisateur] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const history = useHistory();
  const firebase = useContext(FirebaseContext);



  const addUser = (data) => {
    setDataUser(data);
  }

  // const addIdUser = (data) => {
  //   setDataUser(data);
  //   roles = data.role_users;
  //   const role = roles.find(role => role.label === "organisateur");
  //   if(role !== undefined ){
  //     organisateur = true;
  //     setOrganisateur(organisateur);
  //   }
  // }

  const addMarker = (data) => {
    setPoints(data);
  }

  const addParcours = (data) => {
    setParcours(data);
  }

  const addIdParcours = (data) => {
    setIdParcours(data);
  }

  const singout = () => {
    firebase.singoutUser();
    setUserSession(null);
  }

  useEffect(()=> {

    let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : history.push('/');
    })
    //si userSession n'est pas null
    if(!!userSession){
        //récuperation de l'user
      firebase.user(userSession.uid)
      .get()
      .then(doc => {
        if(doc && doc.exists){
          const data = doc.data();
          setDataUser(data)
          setOrganisateur(data.organizer)
        }

      })
      .catch(error => {
        console.log(error)
      })
    }
    return() => {
      listener()
    }
  },[userSession])


  return (
    <div>
      <SessionProvider value={{userSession}}>
        <DataProvider value={{addUser, dataUser,/*addIdUser*/}}>
          <Router basename="/">
            <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <Link to="/" className="navbar-item logo">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>Beacons hunt</span>
                  </Link>

                  <a
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                  <div className="navbar-start">
                  <Link to="/profile" className="navbar-item">Profile</Link>
                  { userSession && 
                    <div className="navbar-item has-dropdown is-hoverable">
                      
                       
                          <Link to="/parcours" className="navbar-link">Parcours</Link>
                          
                      
                      
                      
                        <div className="navbar-dropdown">
                       
                          {organisateur === true &&
                            <Link to="/parcours/add" className="navbar-item">Ajouter un parcour</Link>
                          }
                
                          <Link to="/parcours/mes-parcours" className="navbar-item">
                              Mes parcours
                            </Link>
                        </div>
                  
                      
                    </div>
                    
                     }
                  </div>

                  <div className="navbar-end">
                    <div className="navbar-item">
                      <div className="buttons">
                        <Link to="/inscription" className="button is-primary">
                          Inscription
                        </Link>
                        {userSession === null ?(
                            <Link to="/login" className="button is-light">
                            Connexion
                          </Link>
                        ) : (
                            <button className="button is-light" onClick={singout}>Déconnexion</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <main>
              <Switch>
                <Route exact path="/">
                  <MapView/>
                </Route>
              </Switch>
              <Route exact path="/inscription">
                <UserFromCreate/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
                <Route exact path="/parcours/add">
                <LayerProvider value={{parcours, addParcours,points, addMarker,addIdParcours,idParcours}}>
                  <AddParcours/>
                </LayerProvider>
              </Route>
              <Route exact path="/parcours/add-markers">
                <LayerProvider value={{points, addMarker,parcours, addParcours,addIdParcours,idParcours}}>
                  <AddMarker/>
                </LayerProvider>
              </Route>
              <Route exact path="/parcours">
                <AllParcours/>
              </Route>
              <Route exact path="/profile">
                <UserProfile/>
              </Route>
              <Route exact path="/parcours/mes-parcours">
                <UserParcour/>
              </Route>
              <Route exact path="/parcours/actif/:id">
                  <UserRejoin/>
              </Route>
            </main>
            <footer>
            </footer>
          </Router>
        </DataProvider>
      </SessionProvider>
      
    </div>
  );
}

export default App;
