import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider
} from "firebase/auth";
import { 
    getDatabase, 
    set, 
    ref,
    child,
    get, 
    onValue
} from "firebase/database";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc
} from "firebase/firestore"

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
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
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
  const signUpWithGithub = () => {
    signInWithPopup(auth, githubProvider).
    then((resp)=>{
        const credential = GithubAuthProvider.credentialFromResult(resp);
        const token = credential.accessToken;
        const user = resp.user;
        return [credential, token, user, resp];
    }).
    catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        return [errorCode, errorMessage, email, credential, error];
    });
  }
  const userLoginStatus = () => {
    onAuthStateChanged(auth,(user)=>{
        return !user ? user : false;
    });
  }
  const writeDataInFireStore = async(key, data) => {
    await addDoc(collection(firestore, key), data);
  }
  const getDocument = async(key, id) => {
    const snap = await getDoc(doc(firestore, key, id));
    return snap.data();
  }
  const getDocumentsByQuery = async(key, condition) => {
    const snap = await getDocs(query(collection(firestore, key), where(condition)));
    return snap;
  }
  const updateDocumentRecord = async(key, docId, data) => {
    return await updateDoc(doc(firestore, key, docId), data);
  }
  const fetchDataFromRDB = async(key) => {
    const sanp = await get(child(ref(db), key));
    return sanp.val();
  }
  const fetchRealTimeData = (key) => {
    let snap = null;
    onValue(ref(db, key), (snapshot) => {
        snap = snapshot.val();
    })
    return snap;
  }
  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        storeDataDB,
        loginUser,
        signUpWithGoogle,
        userLoginStatus,
        signOut,
        writeDataInFireStore,
        getDocument,
        getDocumentsByQuery,
        updateDocumentRecord,
        fetchDataFromRDB,
        fetchRealTimeData
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
