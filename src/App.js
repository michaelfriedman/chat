import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Channel from './Channel'
import { firebase } from './firebase'

export default function App() {
  const [user, setUser] = useState(null)
  // leaving verbose for readability
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

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
  }
  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}
