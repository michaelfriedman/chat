import React from 'react'
import Nav from './Nav'
import Channel from './Channel'
import { firebase } from './firebase'
import { useAuth } from './useAuth'

export default function App() {
  const user = useAuth()
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
