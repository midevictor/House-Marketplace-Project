import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCLh5uyHY1fM-npvzU3Y8ZsgyiGmubiU6s",
  authDomain: "house-market-place-apps.firebaseapp.com",
  projectId: "house-market-place-apps",
  storageBucket: "house-market-place-apps.appspot.com",
  messagingSenderId: "64502965299",
  appId: "1:64502965299:web:9a88e91b18e67869576f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();