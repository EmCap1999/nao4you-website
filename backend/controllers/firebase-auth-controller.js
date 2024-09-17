const {
  handleUserCreationError,
  handleAuthenticationError,
  handlePasswordResetError,
  handleLogoutError
} = require('../middleware/auth.error.handler')

const { handleSetUserError } = require('../middleware/firestore.error.handler')

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} = require('../config/firebase')

const { setUser } = require('../controllers/firestore-user-controller')

const auth = getAuth()

class FirebaseAuthController {
  //sign in
  loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
      if (!email || !password) {
        return handleAuthenticationError('missing-item', res)
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      if (!user.emailVerified) {
        return handleAuthenticationError('email-not-verified', res)
      }

      const customToken = await user.getIdToken()

      res.cookie('access_token', customToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })

      return res.status(200).send({ userInfo: user.displayName })
    } catch (error) {
      return handleAuthenticationError(error.code, res)
    }
  }

  // sign up
  async registerUser(req, res) {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
      return handleUserCreationError('missing-item', res)
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      await sendEmailVerification(user)

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })

      await setUser(user.uid, req.body)

      res.status(201).json({
        message:
          'Un email de vérification a été envoyé ! Veuillez vérifier votre compte.'
      })
    } catch (error) {
      if (error.code.startsWith('firestore')) {
        handleSetUserError(error.code, res)
      } else {
        handleUserCreationError(error.code, res)
      }
    }
  }

  // sign out
  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token')
        res
          .status(200)
          .json({ message: "L'utilisateur a bien été déconnecté." })
      })
      .catch((error) => {
        handleLogoutError(error.code, res)
      })
  }

  // reset password
  resetPassword(req, res) {
    const { email } = req.body
    if (!email) {
      return handlePasswordResetError('missing-item', res)
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({
          message:
            'Un email a bien été envoyé ! Vous pouvez changer de mot de passe.'
        })
      })
      .catch((error) => {
        handlePasswordResetError(error.code, res)
      })
  }
}

module.exports = new FirebaseAuthController()
