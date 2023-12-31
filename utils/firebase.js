import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Dkp1yNjevkA1re7NUyEfQJFYzOSaaWs",
  authDomain: "gratifyme-92da3.firebaseapp.com",
  projectId: "gratifyme-92da3",
  storageBucket: "gratifyme-92da3.appspot.com",
  messagingSenderId: "144593920604",
  appId: "1:144593920604:web:2c1ef924e1b0ade1c8fc99",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const firebase = { app, db, auth, storage };
export default firebase;
