import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqTLVRakBEFrLgqL07TCJCtHrfNdbufME',
  authDomain: 'chat-d174b.firebaseapp.com',
  databaseURL: 'https://chat-d174b.firebaseio.com',
  projectId: 'chat-d174b',
  storageBucket: 'chat-d174b.appspot.com',
  messagingSenderId: '283696581017',
  appId: '1:283696581017:web:76e233b739c67cce',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const rtdb = firebase.database()

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const rtdbRef = rtdb.ref(`/status/${user.uid}`)

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      return
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB)
    rtdbRef.set(isOnlineForRTDB)

    console.log(snapshot.val())
  })
}

export { db, firebase }
