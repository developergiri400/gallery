import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBBtje3He6rtZF7INoKoD3Zgj4mvjaEsPs",
    authDomain: "my-gallery-29fba.firebaseapp.com",
    projectId: "my-gallery-29fba",
    storageBucket: "my-gallery-29fba.firebasestorage.app",
    messagingSenderId: "618884018283",
    appId: "1:618884018283:web:a188290eb3acdae8f3c12e",
    measurementId: "G-LQDPDNBWSW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db };  // Named exports instead of default
