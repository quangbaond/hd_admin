// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD4MfZ7o9m6M6GwGsrs7dIGk0FiTgue4qY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : 'hdbank-32a2d.firebaseapp.com',
  projectId: 'hdbank-32a2d',
  // storageBucket: "hdbank-1221d.appspot.com",
  // messagingSenderId: "129342467350",
  appId: '1:714574650402:web:ccc26a1176878b5719be7b',
  // measurementId: "G-WXBNF0YQW2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth(app)

export { app, auth }

