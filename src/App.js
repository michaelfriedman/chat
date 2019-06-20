import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Channel from './Channel'
import { firebase, db } from './firebase'

export default function App() {
  const user = useAuth()

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel user={user} />
    </div>
  ) : (
    <Login />
  )
}

function Login() {
  const [authError, setAuthError] = useState(null)
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.error(error)
      setAuthError(error)
    }
  }
  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>

      {authError && (
        <div>
          <p>Sorry, there was an error logging you in.</p>
          <p>
            <i>{authError.message}</i>
          </p>
        </div>
      )}
    </div>
  )
}

function useAuth() {
  const [user, setUser] = useState(null)
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          const user = {
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            uid: firebaseUser.uid
          }
          setUser(user)
          db.collection('users')
            .doc(user.uid)
            .set(user, { merge: true })
          console.log(user)
        } else {
          setUser(null)
          console.log('no user')
        }
      }),
    []
  )
  return user
}
