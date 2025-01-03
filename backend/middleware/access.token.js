const { admin } = require('../config/firebase')
const { getUser } = require('../controllers/firestore-user-controller')
const {
  handleTokenVerificationError
} = require('../middleware/auth.error.handler')

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token

  if (!idToken) {
    return handleTokenVerificationError('user-disconnected', res)
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    req.user = await getUser(decodedToken.uid)
    next()
  } catch (error) {
    handleTokenVerificationError(error.code, res)
  }
}

module.exports = { verifyToken }
