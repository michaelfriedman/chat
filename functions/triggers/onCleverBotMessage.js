const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
require('isomorphic-fetch')
require('dotenv').config()

const bot = {
  displayName: 'cleverbot',
  photoUrl: 'https://i.imgur.com/ydOMC2c.png',
  uid: 'cleverbot',
  status: {
    lastChanged: new Date(),
    state: 'online',
  },
  channels: {
    general: true,
  },
}

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true })

const KEY = functions.config().cleverbot.key
let cs = ''

function sendMessageToBot(message) {
  const url = `https://www.cleverbot.com/getreply?key=${KEY}&input=${encodeURIComponent(
    message
  )}&cs=${cs}`
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      cs = json.cs
      console.log(cs)
      return json.output
    })
}

function sleep() {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 10000)
  })
}

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data()
    if (!message.text.startsWith('@cleverbot')) {
      return
    }

    return sleep().then(() => {
      sendMessageToBot(message.text.replace(/^@cleverbot /, '')).then(
        botResponse => {
          return db.collection('channels/general/messages').add({
            text: botResponse,
            user: db.collection('users').doc('cleverbot'),
            createdAt: new Date(),
          })
        }
      )
    })
  })
