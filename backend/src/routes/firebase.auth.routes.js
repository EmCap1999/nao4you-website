const express = require('express')
const router = express.Router()
const firebaseAuthController = require('../controllers/firebase.auth.controller')
const verifyToken = require('../middlewares/firebase.auth.middleware')

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Accès autorisé', user: req.user })
})

router.post('/sign-up', firebaseAuthController.SignUp)
router.post('/sign-in', firebaseAuthController.SignIn)
router.delete('/sign-out', firebaseAuthController.SignOut)
router.post('/reset-password', firebaseAuthController.ResetPassword)

module.exports = router
