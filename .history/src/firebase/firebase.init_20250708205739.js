// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey, // Use VITE_ prefix for environment variables in Vite
    authDomain: import.meta.env.VITE_authDomain, // Use VITE_ prefix for environment variables in Vite
    projectId: import.meta.env.VITE_projectId, // Use VITE_ prefix for environment variables in Vite
    storageBucket: import.meta.env.VITE_storageBucket, // Use VITE_ prefix for environment variables in Vite
    messagingSenderId: import.meta.env.VITE_messagingSenderId, // Use VITE_ prefix for environment variables in Vite
    appId: import.meta.env.VITE_appId // Use VITE_ prefix for environment variables in Vite
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);