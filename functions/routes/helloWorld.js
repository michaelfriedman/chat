const functions = require('firebase-functions')

module.exports = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
