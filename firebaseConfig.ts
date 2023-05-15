// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJYdItsdTfI_RFQAtfIr24Y6_B8ulB-g",
  authDomain: "fir-project-5de7a.firebaseapp.com",
  projectId: "fir-project-5de7a",
  storageBucket: "fir-project-5de7a.appspot.com",
  messagingSenderId: "212833881842",
  appId: "1:212833881842:web:60cd098f2ddddc26948a6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);