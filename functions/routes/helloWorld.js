const functions = require('firebase-functions')
const config = functions.config()

module.exports = functions.https.onRequest((request, response) => {
  response.send('Hello world.')
})
