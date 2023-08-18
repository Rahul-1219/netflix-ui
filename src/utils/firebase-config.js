import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEpmoycr7hjHHxDtSE0Ye4IwqBRymGFxI",
  authDomain: "react-netflix-clone-a9d59.firebaseapp.com",
  projectId: "react-netflix-clone-a9d59",
  storageBucket: "react-netflix-clone-a9d59.appspot.com",
  messagingSenderId: "149790832192",
  appId: "1:149790832192:web:e339f2919441c3d2b851a5",
  measurementId: "G-LH5WGZMPH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
