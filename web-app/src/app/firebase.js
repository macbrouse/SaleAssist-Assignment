import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
require('dotenv').config();

const firebaseKey=process.env.FIREBASE

const firebaseConfig = {
  apiKey: `${firebaseKey}`,
  authDomain: "saleassist-234a8.firebaseapp.com",
  projectId: "saleassist-234a8",
  storageBucket: "saleassist-234a8.firebasestorage.app",
  messagingSenderId: "325010058655",
  appId: "1:325010058655:web:652996ce6feaf10dbc21aa",
  measurementId: "G-9R8E9TLQQD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {googleProvider,auth}