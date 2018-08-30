import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyC30xY5gIxpFaOV08fTaMHO8ZQyhdyYm3I",
    authDomain: "rn-firebase-723b8.firebaseapp.com",
    databaseURL: "https://rn-firebase-723b8.firebaseio.com",
    projectId: "rn-firebase-723b8",
    storageBucket: "rn-firebase-723b8.appspot.com",
    messagingSenderId: "264365240412"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};

db.settings(settings);

export { auth, db };
