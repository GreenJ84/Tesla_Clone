
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

export const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "tesla-gclone",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_ID,
    appId: process.env.APP_ID,
};
export const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new TwitterAuthProvider();
export const twitterProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
// https://firebase.google.com/docs/web/setup#available-libraries

export const AUTH = getAuth(app);
export const DB = getFirestore(app);