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
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { setLogin } from "../../app/Store/User/userSlice";
import {
  AUTH,
  DB,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase";

const AltLogin = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [error, setError] = useState("");

  const altSignIn = (provider: any) => {
    setPersistence(AUTH, browserSessionPersistence).then(() => {
      return signInWithPopup(AUTH, provider)
        .then((result) => {
          const credential = () => {
            switch (provider) {
              case facebookProvider:
                return FacebookAuthProvider.credentialFromResult(result);
              case githubProvider:
                return GithubAuthProvider.credentialFromResult(result);
              case googleProvider:
                return GoogleAuthProvider.credentialFromResult(result);
              default:
                return null;
            }
          };
          if (!credential) return;

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
          setError(`Error${credential ? ` ${credential}` : ""}: ${errorMessage}`);
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
    <div>
      <p> Login with a Provider below</p>
      {error ? <div>{error}</div> : ""}
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
  );
};

export default AltLogin;
