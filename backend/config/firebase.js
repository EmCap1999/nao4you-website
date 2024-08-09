require('dotenv').config()
const firebase = require('firebase/app')
const admin = require('firebase-admin')
const serviceAccount = require('../firebaseService.json')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} = require('firebase/auth')

module.exports = {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin
}
