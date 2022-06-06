// import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  
  const handleGoogleSignIn= () => {
    signInWithPopup(auth, provider)
    .then(result =>{
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user);
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
      <button onClick={handleGoogleSignIn}>Google sign-in</button>
      <button onClick={handleGoogleSignOut}>Google sign-Out</button>
      <p><img src={user.photoURL}></img></p>
      <p>User Name: {user.displayName}</p>
      <p>User Email: {user.email}</p>
    </div>
  );
}

export default App;
