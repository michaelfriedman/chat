import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Channel from './Channel'
import { firebase } from './firebase'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() =>
    firebase
      .auth()
      .onAuthStateChanged(user => (user ? setUser(user) : setUser(null)))
  )

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
  }
  return user ? (
    <div className="App">
      <Nav />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}
