// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1s9hmq0jeS7HwpcEIGkbYdUlkIb3GBQA",
  authDomain: "freelancing-project-b5f65.firebaseapp.com",
  projectId: "freelancing-project-b5f65",
  storageBucket: "freelancing-project-b5f65.appspot.com",
  messagingSenderId: "273556235225",
  appId: "1:273556235225:web:9f3bac54da2b2e6941efc8",
  measurementId: "G-R2CL6WN7GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app,analytics}