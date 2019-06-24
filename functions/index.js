const admin = require('firebase-admin')

admin.initializeApp()

exports.onUserStatusChanged = require('./triggers/onUserStatusChanged')
exports.onCleverBotMessage = require('./triggers/onCleverBotMessage')
exports.helloWorld = require('./routes/helloWorld')
