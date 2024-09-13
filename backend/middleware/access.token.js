const { admin } = require('../config/firebase')
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
    req.user = decodedToken.name
    next()
  } catch (error) {
    handleTokenVerificationError(error.code, res)
  }
}

module.exports = { verifyToken }
