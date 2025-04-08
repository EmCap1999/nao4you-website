const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require('../configs/firebase.auth.config')

const {
  getFirebaseErrorMessage,
  validateRequiredFields,
} = require('../errors/firebase.errors')

const auth = getAuth()

class FirebaseAuthController {
  async SignUp(req, res) {
    const missingFields = validateRequiredFields(req.body)
    if (missingFields.length > 0) {
      return res.status(400).json({ errors: missingFields })
    }

    try {
      const { email, password } = req.body

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await sendEmailVerification(userCredential.user)

      res
        .status(201)
        .json({ message: 'Un email de vérification a été envoyé !' })
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code)
      return res.status(500).json({ error: errorMessage })
    }
  }

  async SignIn(req, res) {
    const missingFields = validateRequiredFields(req.body)
    if (missingFields.length > 0) {
      return res.status(400).json({ errors: missingFields })
    }

    try {
      const { email, password } = req.body

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      const idToken = await user.getIdToken()

      if (idToken) {
        res.cookie('access_token', idToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        return res
          .status(200)
          .json({ message: `L'utilisateur ${user.email} est connecté.` })
      }
      const errorMessage = "Token d'authentification manquant."
      return res.status(500).json({ error: errorMessage })
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code)
      return res.status(500).json({ error: errorMessage })
    }
  }

  async SignOut(req, res) {
    try {
      await signOut(auth)
      res.clearCookie('access_token')
      res.status(200).json({ message: 'Utilisateur déconnecté avec succès.' })
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code)
      return res.status(500).json({ error: errorMessage })
    }
  }

  async ResetPassword(req, res) {
    const missingFields = validateRequiredFields(req.body)
    if (missingFields.length > 0) {
      return res.status(400).json({ errors: missingFields })
    }

    try {
      const { email } = req.body

      await sendPasswordResetEmail(auth, email)
      res.status(200).json({
        message: 'Email envoyé avec succès pour changer de mot de passe.',
      })
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code)
      return res.status(500).json({ error: errorMessage })
    }
  }
}

module.exports = new FirebaseAuthController()
