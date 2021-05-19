import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// configuration de firebase
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_API_ID
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
    
    itinerary = (itinerary) => this.db.collection(`itinerary/`).add(itinerary)
                                        .then((docRef) => {
                                            console.log("Document successfully create",docRef.id);
                                        })
                                        .catch(error=> {
                                            console.log(error)
                                        })

    // GET ALL itinerary active

    getAllItineraryIsActive = () => this.db.collection('itinerary').where("isActive","==",true)
                                            .get()

    // GET itinerary

    getItinerary = (id) => this.db.collection('itinerary').doc(id)
                                        .get()

    // GET itinerary User

    getItineraryUser = (uid) => this.db.collection('itinerary').where("userId","==",uid)
                                        .get()

    // Udpate itinerary

    itineraryUpdate = (id,itinerary) => this.db.collection("itinerary/").doc(id).update(itinerary)
                                                .then(() => {
                                                    console.log("Document successfully updated!");
                                                })
                                                .catch(error=> {
                                                    console.log(error)
                                                });

    // Create Game
    
    game = (game) => this.db.collection(`game/`).add(game)
                                        .then((docRef) => {
                                            console.log("Document successfully create",docRef.id);
                                        })
                                        .catch(error=> {
                                            console.log(error)
                                        })
}

export default FireBase;