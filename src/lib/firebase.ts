import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only in the browser if a measurementId is present
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    getAnalytics(app);
}


export { app, auth, db };
