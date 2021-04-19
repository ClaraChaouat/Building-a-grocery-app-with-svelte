import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';


 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAPtxCg-fACyNeDkYzVly_HoMBTyUrURxQ",
    authDomain: "grocery-app-with-svelte.firebaseapp.com",
    projectId: "grocery-app-with-svelte",
    storageBucket: "grocery-app-with-svelte.appspot.com",
    messagingSenderId: "688380681558",
    appId: "1:688380681558:web:4800e1190b1913d9340af7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();