
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyCYjBCaFh6cbvKYvu6s4sGJl3KLk4NVArw",
    authDomain: "tesla-gclone.firebaseapp.com",
    projectId: "tesla-gclone",
    storageBucket: "tesla-gclone.appspot.com",
    messagingSenderId: "248739858073",
    appId: "1:248739858073:web:12b0ab828326283f4cda08",
};
export const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new TwitterAuthProvider();
export const twitterProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
// https://firebase.google.com/docs/web/setup#available-libraries

export const AUTH = getAuth(app);
export const DB = getFirestore(app);