const functions = require('firebase-functions')

module.exports = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
  const randomNumber = Math.random() * 10
  randomNumber < 5
    ? console.error('Error, it was less than 5.')
    : console.warn('Just warning you, it was greater than 5.')
})
