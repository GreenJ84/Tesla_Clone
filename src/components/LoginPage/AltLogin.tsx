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

  const altSignIn = (provider: any) => {
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
                `Error: Account exists with different credential pon ${methods[0]}`
              );
              setError(
                `Error${
                  credential ? `with ${credential.providerId}` : ""
                }: ${errorMessage}`
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
        });
    });
  };

  const googleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    altSignIn(googleProvider);
  };
  const facebookLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    altSignIn(facebookProvider);
  };

  const githubLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    altSignIn(githubProvider);
  };

  return (
    <div id="alt-signIn">
      <p>Login with a Provider below</p>
      {error ? <div>{error}</div> : ""}
      {!accountExist[0] && (
        <div>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              googleLogin(e);
            }}
          >
            Google
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              facebookLogin(e);
            }}
          >
            Facebook
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              githubLogin(e);
            }}
          >
            GitHub
          </button>
        </div>
      )}
    </div>
  );
};

export default AltLogin;
