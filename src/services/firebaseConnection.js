import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBrjuwRleYcYoMM3FLlF5CPG82p53aEqjs",
    authDomain: "applista-3fa11.firebaseapp.com",
    databaseURL: "https://applista-3fa11-default-rtdb.firebaseio.com",
    projectId: "applista-3fa11",
    storageBucket: "applista-3fa11.appspot.com",
    messagingSenderId: "602438087160",
    appId: "1:602438087160:web:a6e60ecc5635acaac7e60d",
    measurementId: "G-2B0MCH6QHY"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;