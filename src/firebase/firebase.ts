import { initializeApp } from "firebase/app";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "uploadimagesapicoffee.firebaseapp.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: "uploadimagesapicoffee.appspot.com",
  messagingSenderId: "315386992707",
  appId: process.env.APP_ID,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
