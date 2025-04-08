const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require('../configs/firebase.auth.config')

const { handleFirebaseError } = require('../errors/firebase.errors')
const { validateRequest } = require('../utils/validation.utils')

const auth = getAuth()

class FirebaseAuthController {
  async SignUp(req, res) {
    if (validateRequest(req.body, res)) return

    try {
      const { email, password } = req.body
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await sendEmailVerification(userCredential.user)

      return res
        .status(201)
        .json({ message: `Un email de vérification a bien été envoyé.` })
    } catch (error) {
      return handleFirebaseError(error, res)
    }
  }

  async SignIn(req, res) {
    if (validateRequest(req.body, res)) return

    try {
      const { email, password } = req.body
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      const idToken = await user.getIdToken()
      if (validateRequest({ token: idToken }, res, 401)) return

      res.cookie('access_token', idToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      return res.status(200).json({
        message: `Tentative de connexion de ${user.email}.`,
      })
    } catch (error) {
      return handleFirebaseError(error, res)
    }
  }

  async SignOut(req, res) {
    try {
      const currentUser = auth.currentUser
      if (validateRequest({ currentUser: currentUser }, res, 401)) return

      await signOut(auth)
      res.clearCookie('access_token')
      return res
        .status(200)
        .json({ message: `Déconnexion de ${currentUser.email}.` })
    } catch (error) {
      return handleFirebaseError(error, res)
    }
  }

  async ResetPassword(req, res) {
    if (validateRequest(req.body, res)) return

    try {
      const { email } = req.body
      await sendPasswordResetEmail(auth, email)
      return res.status(200).json({
        message:
          'Un email de réinitialisation vous sera envoyé si le compte existe.',
      })
    } catch (error) {
      return handleFirebaseError(error, res)
    }
  }
}

module.exports = new FirebaseAuthController()
