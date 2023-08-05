// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7_lpOBffOk0Up3A1e4BzD-LaoX1_DdS0",
  authDomain: "utpal-portfolio.firebaseapp.com",
  projectId: "utpal-portfolio",
  storageBucket: "utpal-portfolio.appspot.com",
  messagingSenderId: "576552535320",
  appId: "1:576552535320:web:d96a95df518f1914bb0a6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {storage, auth, provider};