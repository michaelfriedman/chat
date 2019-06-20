import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDqTLVRakBEFrLgqL07TCJCtHrfNdbufME',
  authDomain: 'chat-d174b.firebaseapp.com',
  databaseURL: 'https://chat-d174b.firebaseio.com',
  projectId: 'chat-d174b',
  storageBucket: 'chat-d174b.appspot.com',
  messagingSenderId: '283696581017',
  appId: '1:283696581017:web:76e233b739c67cce'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }
