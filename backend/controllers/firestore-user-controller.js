const { firestore } = require('../config/firebase')

async function setUser(uid, userData) {
  try {
    // eslint-disable-next-line no-unused-vars
    const { password, ...dataToStore } = userData

    await firestore
      .collection('users')
      .doc(uid)
      .set(dataToStore, { merge: true })
  } catch (error) {
    throw new Error(`firestore/${error.code}`)
  }
}

async function getUser(uid) {
  try {
    const userDoc = await firestore.collection('users').doc(uid).get()

    if (!userDoc.exists) {
      throw new Error('Utilisateur non trouvé')
    }
    return userDoc.data()
  } catch (error) {
    throw new Error(`firestore/${error.code}`)
  }
}

module.exports = {
  setUser,
  getUser
}
