function getFirebaseErrorInfo(errorCode) {
  switch (errorCode) {
    // Authentication errors (400 Bad Request)
    case 'auth/missing-email':
      return { message: "L'adresse e-mail est manquante.", status: 400 }
    case 'auth/invalid-email':
      return { message: "L'adresse e-mail n'est pas valide.", status: 400 }
    case 'auth/weak-password':
      return { message: 'Le mot de passe est trop faible.', status: 400 }

    // Conflicts (409 Conflict)
    case 'auth/email-already-in-use':
      return {
        message: "L'adresse e-mail est déjà utilisée par un autre compte.",
        status: 409,
      }

    // Authentication errors (401 Unauthorized)
    case 'auth/user-not-found':
      return {
        message: 'Aucun utilisateur trouvé avec cette adresse e-mail.',
        status: 401,
      }
    case 'auth/invalid-credential':
      return {
        message: "Information(s) d'identification invalide(s).",
        status: 401,
      }
    case 'auth/wrong-password':
      return { message: 'Le mot de passe est incorrect.', status: 401 }
    case 'auth/no-current-user':
      return {
        message: "Aucun utilisateur n'est actuellement connecté.",
        status: 401,
      }

    // Args/Validations errors (400 Bad Request)
    case 'auth/argument-error':
      return {
        message: 'Format de token invalide. Veuillez vous reconnecter.',
        status: 400,
      }
    case 'auth/admin-restricted-operation':
      return {
        message:
          "Opération non autorisée. Veuillez fournir les informations d'authentification.",
        status: 400,
      }

    // Token errors (403 Forbidden)
    case 'auth/invalid-custom-token':
      return { message: 'Le token vérifié est invalide.', status: 403 }
    case 'auth/custom-token-mismatch':
      return { message: 'Le token vérifié ne correspond pas.', status: 403 }
    case 'auth/invalid-id-token':
      return { message: 'Le token ID vérifié est invalide.', status: 403 }
    case 'auth/id-token-expired':
      return { message: 'Le token ID vérifié a expiré.', status: 403 }
    case 'auth/id-token-revoked':
      return { message: 'Le token ID vérifié a été révoqué.', status: 403 }
    case 'auth/session-cookie-expired':
      return { message: 'Le cookie de session vérifié a expiré.', status: 403 }
    case 'auth/session-cookie-revoked':
      return {
        message: 'Le cookie de session vérifié a été révoqué.',
        status: 403,
      }

    // Default error (500 Internal Server Error)
    default:
      console.error(`Code d'erreur non géré: ${errorCode}`)
      return { message: 'Erreur interne du serveur', status: 500 }
  }
}

function handleFirebaseError(error, res) {
  const errorCode = error.code || 'unknown'
  const { message, status } = getFirebaseErrorInfo(errorCode)
  return res.status(status).json({ error: message })
}

module.exports = {
  handleFirebaseError,
}
