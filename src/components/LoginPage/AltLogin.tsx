/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  browserSessionPersistence,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  OAuthCredential,
  AuthCredential,
  AuthProvider,
  signInWithEmailAndPassword,
  linkWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { setLogin } from "../../app/Store/User/userSlice";
import {
  AUTH,
  DB,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase/firebase";
import Login2 from "./Login2";

interface existingAccount {
  email: string;
  credential: AuthCredential | null;
  method: string;
}

const AltLogin = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [accountExist, setAccountExist] = useState<[boolean, existingAccount]>([
    false,
    { credential: null, email: "", method: "" },
  ]);
  const [error, setError] = useState("");

  // Normal Alternate Sign in with Error Handling
  const altSignIn = (e: React.MouseEvent<HTMLButtonElement>, provider: any) => {
    e.preventDefault();
    setError("");
    setPersistence(AUTH, browserSessionPersistence).then(() => {
      return signInWithPopup(AUTH, provider)
        .then((result) => {
          let credential: OAuthCredential | null;
          switch (provider) {
            case facebookProvider:
              credential = FacebookAuthProvider.credentialFromResult(result);
              break;
            case githubProvider:
              credential = GithubAuthProvider.credentialFromResult(result);
              break;
            case googleProvider:
              credential = GoogleAuthProvider.credentialFromResult(result);
              break;
            default:
              credential = null;
          }
          if (credential == null) {
            setError(
              "No User credential returned from your registered login provider."
            );
            return;
          }

          const user = result.user;
          setDoc(
            doc(DB, "users", user.uid),
            {
              name: user.displayName,
              email: user.email,
            },
            { merge: true }
          );
          dispatch(setLogin(user));
          nav("/");
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            // The pending provider credential.
            const credential: AuthCredential = error.credential;
            // The provider account's email address.
            const email: string = error.email;
            // Update the existing account's info.
            fetchSignInMethodsForEmail(AUTH, email).then((methods) => {
              setAccountExist([
                true,
                { credential, email, method: methods[0] },
              ]);
              console.error(
                `Error: Account exists with ${email} on ${methods[0] === "password" ? "password" : "email"}.`
              );
            });
            return;
          }
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message.split(": ")[1];
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          console.error(
            `Error ${errorCode} with ${credential} for ${email}: ${errorMessage}`
          );
          setError(
            `Error${credential ? ` ${credential}` : ""}: ${errorMessage}`
          );
          return;
        });
    });
  };

  // Existing Account Sign In linking
  const [password, setPassword] = useState("");
  const existingLogin = (e: React.MouseEvent, provider?: AuthProvider) => {
    e.preventDefault();
    setError("");
    setPersistence(AUTH, browserSessionPersistence).then(() => {
      return accountExist[1].method === "password" ? 
        signInWithEmailAndPassword(AUTH, accountExist[1].email, password)
          .then((result) => {
              return linkWithCredential(result.user, accountExist[1].credential as AuthCredential);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message.split(": ")[1];
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = error.credential;
  
            console.error(
              `Error ${errorCode} with ${credential} for ${email}: ${errorMessage}`
            );
            setError(
              `Error${credential ? ` ${credential}` : ""}: ${errorMessage}`
            );
            return;
          })
      : 
        signInWithPopup(AUTH, provider!)
          .then((result) => { 
            return linkWithCredential(result.user, accountExist[1].credential as AuthCredential)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message.split(": ")[1];
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = error.credential;
  
            console.error(
              `Error ${errorCode} with ${credential} for ${email}: ${errorMessage}`
            );
            setError(
              `Error${credential ? ` ${credential}` : ""}: ${errorMessage}`
            );
            return;
          });
      ;
    });
  };

  return (
    <div id="alt-signIn">
      {!accountExist[0] ? (
        <p>Login with a Provider below</p>
      ) : (
        <p>
          Existing login credentials found
          <br/>
          Please login{" "}
          {accountExist[1].method === "password"
            ? "with the password you created on this site"
            : "throught the provider registered through the link below "}
          for the account with email: <b>{accountExist[1].email}</b>
        </p>
      )}
      {error ? <div>{error}</div> : ""}

      {/* If there is no existing Acct errors or if an account exists with a provider listed */}
      {!accountExist[0] || accountExist[1].method !== "password" ? (
        <div>
          {(!accountExist[0] || accountExist[1].method !== "google.com") && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                accountExist[0]
                  ? altSignIn(e, googleProvider)
                  : existingLogin(e, googleProvider);
              }}
            >
              Google
            </button>
          )}
          {(!accountExist[0] || accountExist[1].method !== "facebook.com") && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                accountExist[0]
                  ? altSignIn(e, facebookProvider)
                  : existingLogin(e, facebookProvider);
              }}
            >
              Facebook
            </button>
          )}
          {(!accountExist[0] || accountExist[1].method !== "github.com") && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                accountExist[0]
                  ? altSignIn(e, githubProvider)
                  : existingLogin(e, githubProvider);
              }}
            >
              GitHub
            </button>
          )}
        </div>
      ) : (
        <>
          <Login2
            password={[password, setPassword]}
            login={(e: React.MouseEvent<HTMLLIElement>) => {
              existingLogin(e);
            }}
            error={ error }
          />
        </>
      )}
    </div>
  );
};

export default AltLogin;
