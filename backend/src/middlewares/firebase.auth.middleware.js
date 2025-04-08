const { admin } = require('../configs/firebase.auth.config')
const { handleFirebaseError } = require('../errors/firebase.errors')
const { validateRequest } = require('../utils/validation.utils')

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token

  if (validateRequest({ token: idToken }, res, 403)) {
    return
  }

  try {
    req.user = await admin.auth().verifyIdToken(idToken)
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    return handleFirebaseError(error, res)
  }
}

module.exports = verifyToken
