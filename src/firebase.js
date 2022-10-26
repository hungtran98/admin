// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnCNGgkv2JTC_ffaAxVgbO6FGU5yda4cU",
  authDomain: "hungshop-8d22d.firebaseapp.com",
  projectId: "hungshop-8d22d",
  storageBucket: "hungshop-8d22d.appspot.com",
  messagingSenderId: "1074383425081",
  appId: "1:1074383425081:web:a3bafe56c14d0eb4f207e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app