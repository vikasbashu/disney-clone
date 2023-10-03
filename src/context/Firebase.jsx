import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDohXBVM0C_uZSYN0sAVizjgAV6Ij5Pw8s",
  authDomain: "disneyplus-hotstar-clone-ce216.firebaseapp.com",
  projectId: "disneyplus-hotstar-clone-ce216",
  storageBucket: "disneyplus-hotstar-clone-ce216.appspot.com",
  messagingSenderId: "156884669577",
  appId: "1:156884669577:web:8d48c4978e5c7698c0e258",
  measurementId: "G-JY99Y07B45",
  databaseURL:
    "https://disneyplus-hotstar-clone-ce216-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const storeDataDB = (key, data) => {
    set(ref(db, key), data);
  };
  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  }

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        storeDataDB,
        loginUser,
        signUpWithGoogle
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
