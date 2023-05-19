/** @format */

import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { browserSessionPersistence, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import MinimalHeader from "../components/Layout/MinimalHeader";
import SmallFooter from "../components/Layout/SmallFooter";
import Login1 from "../components/LoginPage/Login1";
import Login2 from "../components/LoginPage/Login2";
import { Button2, Divide, LoginMainContainer, Revert } from "../app/Utils/StyledComponents/LoginComponents";

import { setLogin } from "../app/Store/User/userSlice";
import { AUTH, DB, facebookProvider, githubProvider, googleProvider } from "../firebase";

const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secStep, setSecStep] = useState(false);
  const [error, setError] = useState("");

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setPersistence(AUTH, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(AUTH, email, password)
              .then((userCredential) => {
                if (!userCredential.user) { return }
                const user = userCredential.user;
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
                const errorMessage = error.message.split(": ")[1];
                setError(`${errorMessage}`);
              })
          }
      )
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message.split(": ")[1];
        setError(`${errorMessage}`);
      })
  }
  const googleLogin = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    signInWithPopup(AUTH, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) return;

      const user = result.user;
      dispatch(setLogin(user));
      nav("/");
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message.split(": ")[1];
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(`Error ${credential} (${email}): ${errorMessage}`);
      setError(`Error ${credential} (${email}): ${errorMessage}`);
    });
  }
  const facebookLogin = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    signInWithPopup(AUTH, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        if (!credential) return;

        dispatch(setLogin(user))
        nav('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        
        console.log(`Error ${credential} (${email}): ${errorMessage}`);
        setError(`Error ${credential} (${email}): ${errorMessage}`);
      });
  }
  const githubLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    signInWithPopup(AUTH, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (!credential) return;

        dispatch(setLogin(user))
        nav('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        
        console.log(`Error ${credential} (${email}): ${errorMessage}`);
        setError(`Error ${credential} (${email}): ${errorMessage}`);
      });
  }

  return (
    <>
      <MinimalHeader />
      <LoginMainContainer>
        <h1>Sign In</h1>
        {secStep ? (
          <div className="flex justify-between mb-6">
            <h4 className="text-lg">{email}</h4>
            <div className="relative">
              <Revert
                onClick={() => setSecStep(false)}
              >
                Change
              </Revert>
            </div>
          </div>
        ) : (
          ""
        )}
        <form>
          {!secStep ? (
            <Login1
              email={[email, setEmail]}
              setStep={() => setSecStep(true)}
            />
          ) : (
            <Login2
              password={[password, setPassword]}
              login={(e: React.MouseEvent<HTMLButtonElement>) => login(e)}
              error={error}
            />
          )}
        </form>
        <div className="relative">
          <Divide> Or </Divide>
        </div>
        <Button2>Alternate Sign-In</Button2>
        <br />
        <Button2 onClick={() => nav("/registration")}>Create Account</Button2>
      </LoginMainContainer>
      <SmallFooter />
    </>
  );
};

export default LoginPage;
