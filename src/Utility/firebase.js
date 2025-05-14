import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6mAGtezyZbmlResbzZptNtwZZAVs2I6Y",
  authDomain: "e-clone-df53f.firebaseapp.com",
  projectId: "e-clone-df53f",
  storageBucket: "e-clone-df53f.firebasestorage.app",
  messagingSenderId: "576467870296",
  appId: "1:576467870296:web:66e77871429551818ee02d",
  measurementId: "G-GQRZVEV0SX"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=app.firestore();