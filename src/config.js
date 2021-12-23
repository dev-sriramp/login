import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const fireBase = {
  apiKey: "AIzaSyAE7lcJkRIfkK_JsNepgYUSqfBtfyjm7IA",
  authDomain: "registeration-form-7e936.firebaseapp.com",
  projectId: "registeration-form-7e936",
  storageBucket: "registeration-form-7e936.appspot.com",
  messagingSenderId: "706569150889",
  appId: "1:706569150889:web:0b46cb0ab968af7504a4b8"
};

const firebaseConfig = initializeApp(fireBase);
const Auth = getAuth(firebaseConfig);
const db = getFirestore();
export { Auth, db };