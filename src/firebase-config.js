import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDSFSUnsV0p_I1I6IgKoXn6JADM_wccU8I",
  authDomain: "movie-test-7d855.firebaseapp.com",
  projectId: "movie-test-7d855",
  storageBucket: "movie-test-7d855.appspot.com",
  messagingSenderId: "120445850874",
  appId: "1:120445850874:web:fc2e1e21693ae54ffbe543",
  measurementId: "G-GSB34DHK07"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)