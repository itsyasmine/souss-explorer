import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN5LxvH4hy97HoHX2veLeiVYkDVwifbVE",
  authDomain: "souss-explorer.firebaseapp.com",
  projectId: "souss-explorer",
  storageBucket: "souss-explorer.firebasestorage.app",
  messagingSenderId: "430172964831",
  appId: "1:430172964831:web:e01059d300d3d001b2266a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
