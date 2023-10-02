import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNvLEjxKXHbA1fdxM5D3lPhT8LvMCTUt8",
  authDomain: "fachat-83fa3.firebaseapp.com",
  projectId: "fachat-83fa3",
  storageBucket: "fachat-83fa3.appspot.com",
  messagingSenderId: "921464917028",
  appId: "1:921464917028:web:64b67b193132f5e1265cb1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
