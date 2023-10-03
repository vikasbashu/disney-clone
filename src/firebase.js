// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite";
import {getAuth, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDohXBVM0C_uZSYN0sAVizjgAV6Ij5Pw8s",
  authDomain: "disneyplus-hotstar-clone-ce216.firebaseapp.com",
  projectId: "disneyplus-hotstar-clone-ce216",
  storageBucket: "disneyplus-hotstar-clone-ce216.appspot.com",
  messagingSenderId: "156884669577",
  appId: "1:156884669577:web:8d48c4978e5c7698c0e258",
  measurementId: "G-JY99Y07B45",
  databaseURL: "https://disneyplus-hotstar-clone-ce216-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
//const provider = auth.GoogleAuthProvider();
const storage = getStorage(app);


// methods
export const createUser = async(email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const loginUser = (email ,password ) =>{
  signInWithEmailAndPassword(auth, email, password).
  then((value)=>console.log("Logged In. Sucessfully!", value)).
  catch((err)=>{console.log(err)});
}

onAuthStateChanged(auth, user =>{ !user ? console.log('logged in!'): console.log('No user')});

export {auth,
   storage,
    app,
  };
export default db;