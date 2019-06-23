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

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const rtdbRef = rtdb.ref(`/status/${user.uid}`)
  const userDoc = db.doc(`users/${user.uid}`)

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      })
      return
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB)
    rtdbRef.set(isOnlineForRTDB)
    userDoc.update({
      status: isOnlineForFirestore,
    })
  })
}

export { db, firebase }
