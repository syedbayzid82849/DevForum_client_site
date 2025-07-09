// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    VITE_apiKey: "AIzaSyAhGb8hi_PMOxHeWqK39R0ocYJuNdXcvHU",
    VITE_authDomain: "pawfect-project-c3ac0.firebaseapp.com",
    VITE_projectId: "pawfect-project-c3ac0",
    VITE_storageBucket: "pawfect-project-c3ac0.firebasestorage.app",
    VITE_messagingSenderId: "536654288846",
    VITE_appId: "1:536654288846:web:2fb1815728217dda14bd9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);