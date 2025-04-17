import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCzilFnxyn_EyETeekVVqNVsipoLqZUyI",
  authDomain: "message-f4e1b.firebaseapp.com",
  databaseURL: "https://message-f4e1b-default-rtdb.firebaseio.com",
  projectId: "message-f4e1b",
  storageBucket: "message-f4e1b.appspot.com", 
  messagingSenderId: "305215596246",
  appId: "1:305215596246:web:4718c8941c9ccee0d7cb77"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
