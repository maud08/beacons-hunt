import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// configuration de firebase
const config = {
    apiKey: "AIzaSyDh_6k-sE0kEN72YKpKO9as8tLQ0o6ltlc",
    authDomain: "beacons-hunt-86542.firebaseapp.com",
    projectId: "beacons-hunt-86542",
    storageBucket: "beacons-hunt-86542.appspot.com",
    messagingSenderId: "1041313018469",
    appId: "1:1041313018469:web:23f59ce1901c53c2cf0c8c"
  };

class FireBase {
    constructor(){
        app.initializeApp(config);
        //API fireBase d'authentification
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Inscription
    signupUser = (email,password) => 
        this.auth.createUserWithEmailAndPassword(email,password)
    

    // Connexion
    loginUser = (email,password) => 
        this.auth.signInWithEmailAndPassword(email,password)
    

    // Déconnexion
    singoutUser = () => this.auth.signOut()

    // Création d'un user dans la collection users
    user = uid => this.db.doc(`users/${uid}`);

    // Update user

    userUpdate = (uid,user) => this.db.collection("users").doc(uid).update(user)
                        .then(() => {
                            console.log("Document successfully updated!");
                        })
                        .catch(error=> {
                            console.log(error)
                        });
    

    // Création d'un parcours dans la collection itinerary
    
    itinerary = (itineray) => this.db.collection(`itinerary/`).add({itineray})
                        .then((docRef) => {
                            console.log("Document successfully create",docRef.id);
                        })
                        .catch(error=> {
                            console.log(error)
                        })
}

export default FireBase;