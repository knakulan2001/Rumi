import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA-pBBNyIuWIEs-fQl60G-fvyfoKyobDC4",
    authDomain: "csc648rumi.firebaseapp.com",
    projectId: "csc648rumi",
    storageBucket: "csc648rumi.appspot.com",
    messagingSenderId: "807183421594",
    appId: "1:807183421594:web:1c5c2ee1b2efb53b9a0f23",
    measurementId: "G-B7GP0DS5CY",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
