// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? import.meta.env.VITE_FIREBASE_API_KEY : 'AIzaSyD-1Q1J9Q1J9Q1J9Q1J9Q1J9Q1J9Q1J9Q1',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : 'hdbank-32a2d.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? import.meta.env.VITE_FIREBASE_PROJECT_ID : 'hdbank-32a2d',
  // storageBucket: "hdbank-1221d.appspot.com",
  // messagingSenderId: "129342467350",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? import.meta.env.VITE_FIREBASE_APP_ID : '1:129342467350:web:0f5f5d5f5d5f5d5f5d5f5d5f5d5d5d5f',
  // measurementId: "G-WXBNF0YQW2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth(app)

export { app, auth }

