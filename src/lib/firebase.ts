import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-5259536795-ff10d",
  "appId": "1:1037773551011:web:2cd7176e2773254d0cd616",
  "storageBucket": "studio-5259536795-ff10d.firebasestorage.app",
  "apiKey": "AIzaSyApNNptaoIvl0Lsc8pUQWuyethucsjFedw",
  "authDomain": "studio-5259536795-ff10d.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1037773551011"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
