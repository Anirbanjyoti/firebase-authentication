// import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  // Google Provider
  const GoogleProvider = new GoogleAuthProvider();
  // Github Provider
  const GithubProvider = new GithubAuthProvider();
  
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
  const handleGoogleSignOut= () => {
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
    <h1 style={{textAlign: 'center'}}>Firebase Authentication on Google Sign in and sign Out</h1>
      {
        user.uid ?
        <button onClick={handleGoogleSignOut}>sign-Out</button>
        :
        <>
        <button onClick={handleGoogleSignIn}>Google sign-in</button>
        <button onClick={handleGithubSignIn}>Github sign-in</button>
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
