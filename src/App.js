import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Channel from './Channel'
import { firebase } from './firebase'

export default function App() {
  const user = useAuth()

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
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
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser({
            displayName: user.displayName,
            photoUrl: user.photoURL,
            uid: user.uid
          })
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
