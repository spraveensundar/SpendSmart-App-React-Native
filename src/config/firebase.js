import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore,collection} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBVb51x9E67AHERJl1_4yG1jcRsG7jdXbY",
  authDomain: "disney-auth-45405.firebaseapp.com",
  projectId: "disney-auth-45405",
  storageBucket: "disney-auth-45405.appspot.com",
  messagingSenderId: "800374716548",
  appId: "1:800374716548:web:cd60e160cd3e9a168faad1",
  measurementId: "G-HWQD0HYE08"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;