// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDT6dQWtTTlkm_7gmm5e19it8wAtdCOXbs',
  authDomain: 'react-cursos-bd84f.firebaseapp.com',
  projectId: 'react-cursos-bd84f',
  storageBucket: 'react-cursos-bd84f.appspot.com',
  messagingSenderId: '908722632317',
  appId: '1:908722632317:web:6d932825caf29f2bc6e314',
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
