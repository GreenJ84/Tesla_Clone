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
import {
  AUTH,
  DB,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { AltLoginModal } from "../../app/Utils/StyledComponents/LoginComponents";
import { Close } from "../../app/Utils/StyledComponents/LayoutComponents";
import Login2 from "./Login2";

import { setLogin } from "../../app/Store/User/userSlice";

interface existingAccount {
  email: string;
  credential: AuthCredential | null;
  method: string;
}

const AltLogin = ({ close }: { close: Function }) => {
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
                `Error: Account exists with ${email} on ${
                  methods[0] === "password" ? "password" : "email"
                }.`
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
    if (!accountExist[0]) {
      return;
    }
    setPersistence(AUTH, browserSessionPersistence).then(() => {
      return accountExist[1].method === "password"
        ? signInWithEmailAndPassword(AUTH, accountExist[1].email, password)
            .then((result) => {
              return linkWithCredential(
                result.user,
                accountExist[1].credential as AuthCredential
              );
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
        : signInWithPopup(AUTH, provider!)
            .then((result) => {
              return linkWithCredential(
                result.user,
                accountExist[1].credential as AuthCredential
              );
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
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, provider: AuthProvider) => { 
    accountExist[0]
      ? altSignIn(e, provider)
      : existingLogin(e, provider);
  }

  return (
    <AltLoginModal
      role="dialog"
      id="alt-signIn"
      aria-modal="true"
      aria-labelledby="altLog-title"
      aria-describedby="altLog-description"
    >
      <Close onClick={() => close()}>
        <XMarkIcon
          style={{ cursor: "pointer" }}
          className="h-8 w-8"
          aria-label="Close"
        />
      </Close>
      <h2 id="altLog-title">Alternate Provider Login</h2>
      {!accountExist[0] ? (
        <p id="altLog-description">Available Providers</p>
      ) : (
        <p id="altLog-description">
          Existing login credentials found
          <br />
          <br />
          Please login{" "}
          {accountExist[1].method === "password"
            ? "with the password you created on this site "
            : "through the provider link below "}
          for the account with email: <b>{accountExist[1].email}</b>
        </p>
      )}
      {error && <div role="alert" aria-live="assertive" aria-atomic="true">{error}</div>}

      {/* Render all If there is no existing Acct errors*/}
      {/* Render the provider link for the existing account listed if not password */}
      {!accountExist[0] || accountExist[1].method !== "password" ? (
        <div aria-label="Alternate Login Provider Access Buttons">
          {(!accountExist[0] || accountExist[1].method === "google.com") && (
            <button
              aria-label="Google Login Pop-Up Button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleClick(e, googleProvider);
              }}
            >
              <FcGoogle className="h-16 w-16"/>
              <span>Google</span>
            </button>
          )}
          {(!accountExist[0] || accountExist[1].method === "facebook.com") && (
            <button
              aria-label="Facebook Login Pop-Up Button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleClick(e, facebookProvider);

              }}
            >
              <BsFacebook className="h-16 w-16"/>
              <span>Facebook</span>
            </button>
          )}
          {(!accountExist[0] || accountExist[1].method === "github.com") && (
            <button
              aria-label="GitHub Login Pop-Up Button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleClick(e, githubProvider);
              }}
            >
              <BsGithub className="h-16 w-16" />
              <span>GitHub</span>
            </button>
          )}
        </div>
      ) : (
        <form>
          <Login2
            password={[password, setPassword]}
            login={(e: React.MouseEvent<HTMLLIElement>) => {
              existingLogin(e);
            }}
            error={error}
          />
        </form>
      )}
    </AltLoginModal>
  );
};

export default AltLogin;
