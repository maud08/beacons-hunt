import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './components/firebase';

ReactDOM.render(
  // <React.StrictMode>
    // Permet de rendre le contexte accésible a l'app et ses enfant mais aussi 
    // de créer une nouvelle class Firebase et de l'instencier uen seule fois pour toute l'app
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
