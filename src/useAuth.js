import { useState, useEffect } from 'react'
import { firebase } from './firebase'

export function useAuth() {
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
