// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeN5Sg_MG15vsTIYuW85L_gmS3SaX0NiQ",
  authDomain: "dimts-project.firebaseapp.com",
  projectId: "dimts-project",
  storageBucket: "dimts-project.appspot.com",
  messagingSenderId: "650219791304",
  appId: "1:650219791304:web:baac99eb063e379a9616fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);