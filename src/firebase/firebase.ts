
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
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();
// https://firebase.google.com/docs/web/setup#available-libraries

export const AUTH = getAuth(app);
export const DB = getFirestore(app);

            // Get sign-in methods for this email.
            fetchSignInMethodsForEmail(AUTH, email).then((methods) => {
                // the first method in the list will be the "recommended" method to use.
                if (methods[0] === "password") {
                  signInWithEmailAndPassword(AUTH, email, "password")
                    .then((result) => {
                      // Step 4a.
                      return linkWithCredential(result.user, pendingCred);
                    })
                    .then(() => {
                      // Google account successfully linked to the existing Firebase user.
                      nav("/");
                    });
                  return;
                }
  
                const providerMatch = () => {
                  switch (methods[0]) {
                    case "facebook.com":
                      return facebookProvider;
                    case "github.com":
                      return githubProvider;
                    case "google.com":
                      return googleProvider;
                    default:
                      return null;
                  }
                };
                const provider = providerMatch();
                if (provider === null) {
                  return;
                }
                // let the user know that they already have an account
                signInWithPopup(AUTH, provider).then(function (result) {
                  linkWithCredential(result.user, pendingCred).then(function (
                    usercred
                  ) {
                    // Google account successfully linked to the existing Firebase user.
                    nav("/");
                  });
                  return;
                });
              });