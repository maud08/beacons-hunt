import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.scss';
import {DataProvider} from "./components/context/userContext";
import {LayerProvider} from "./components/context/layerContext";
import UserFromCreate from './components/user/user-from-create';
import MapView from './components/map/map-view';
import AddMarker from './components/map/map-add-marker';
import Parcours from './components/map/map-add-parcours';


function App() {
  const [dataUser, setDataUser] = useState();

  const [points, setPoints] = useState([50.83772875638055,4.389038085937501]);

  const addUser = (data) => {
    setDataUser(data);
  }

  const addMarker = (data) => {
    setPoints(data);
  }
  


  return (
    <div>
      <DataProvider value={{addUser, dataUser}}>
        <Router basename="/">
          <header>
          <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                </Link>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <Link to="/inscription" className="navbar-item">
                    Inscription
                  </Link>

                  <Link to="/parcours/add-markers" className="navbar-item">
                     Parcours
                  </Link>

                  {/* <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                      More
                    </a>

                    <div className="navbar-dropdown">
                      <a className="navbar-item">
                        About
                      </a>
                      <a className="navbar-item">
                        Jobs
                      </a>
                      <a className="navbar-item">
                        Contact
                      </a>
                      <a className="navbar-item">
                        Report an issue
                      </a>
                    </div>
                  </div> */}
                </div>

                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <a className="button is-primary">
                        <strong>Sign up</strong>
                      </a>
                      <a className="button is-light">
                        Log in
                      </a>
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
            <Route exact path="/parcours">
              <LayerProvider value={{points, addMarker}}>
                <AddMarker/>
              </LayerProvider>
            </Route>
            <Route exact path="/parcours/add-markers">
              <LayerProvider value={{points, addMarker}}>
                <Parcours/>
              </LayerProvider>
            </Route>
          </main>
          <footer>
          </footer>
        </Router>
      </DataProvider>
      
    </div>
  );
}

export default App;
