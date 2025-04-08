function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {
    // sign in-up and reset password errors
    case 'auth/missing-email':
      return "L'adresse e-mail est manquante."
    case 'auth/email-already-in-use':
      return "L'adresse e-mail est déjà utilisée par un autre compte."
    case 'auth/invalid-email':
      return "L'adresse e-mail n'est pas valide."
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible.'
    case 'auth/user-not-found':
      return 'Aucun utilisateur trouvé avec cette adresse e-mail.'
    case 'auth/invalid-credential':
      return "Information(s) d'identification invalide(s)."
    case 'auth/wrong-password':
      return 'Le mot de passe est incorrect.'

    // token errors
    case 'auth/invalid-custom-token':
      return 'Le token vérifié est invalide.'
    case 'auth/custom-token-mismatch':
      return 'Le token vérifié ne correspond pas.'
    case 'auth/invalid-id-token':
      return 'Le token ID vérifié est invalide.'
    case 'auth/id-token-expired':
      return 'Le token ID vérifié a expiré.'
    case 'auth/id-token-revoked':
      return 'Le token ID vérifié a été révoqué.'
    case 'auth/session-cookie-expired':
      return 'Le cookie de session vérifié a expiré.'
    case 'auth/session-cookie-revoked':
      return 'Le cookie de session vérifié a été révoqué.'

    // sign out errors
    case 'auth/no-current-user':
      return "Aucun utilisateur n'est actuellement connecté."

    default:
      console.error(`Unhandled error code: ${errorCode}`)
      return 'Erreur interne du serveur'
  }
}

function validateRequiredFields(body) {
  return Object.entries(body)
    .filter(([key, value]) => {
      return value === undefined || value === null || value === ''
    })
    .map(([key]) => `Le champ ${key} est requis.`)
}

module.exports = {
  getFirebaseErrorMessage,
  validateRequiredFields,
}
