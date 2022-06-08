// import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  // Google Provider
  const GoogleProvider = new GoogleAuthProvider();
  // Github Provider
  const GithubProvider = new GithubAuthProvider();
  // Facebook Provider
  const facebookProvider = new FacebookAuthProvider();
  
  const handleGoogleSignIn= () => {
    signInWithPopup(auth, GoogleProvider)
    .then(result =>{
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user);
    })
  }
  const handleGithubSignIn =() =>{
    signInWithPopup(auth, GithubProvider)
      .then(result =>{
      // The signed-in user info.
      const user = result.user;
      setUser(user);
  })
  }
  const handleFacebookSignIn =() =>{
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      setUser(user);
      console.log(user);
      
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(accessToken);
      
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });
  }
  const handleSignOut= () => {
    signOut(auth)
    .then(() => {
      setUser({});
      console.log(`Sign Out successful`);
      
    }).catch((error) => {
      console.log('Error', error);
    });
  }
  return (
    <div className="App">
    <h1 style={{textAlign: 'center'}}>Firebase Authentication on Google and Social Log in and Log Out</h1>
      {
        user.uid ?
        <button onClick={handleSignOut}>sign-Out</button>
        :
        <>
        <button onClick={handleGoogleSignIn}>Google sign-in</button>
        <button onClick={handleGithubSignIn}>Github sign-in</button>
        <button onClick={handleFacebookSignIn}>Facebook sign-in</button>
        </>
      }

      {
        user.photoURL ?
        <p><img src={user.photoURL} alt='img'></img></p>
        :
        <p><small><i>User Photo</i></small></p>
         }
      <p>User Name: {user.displayName}</p>
      <p>User Email: {user.email}</p>
    </div>
  );
}

export default App;
