const errorMessages = {
  authentication: {
    'missing-item': {
      message: 'Veuillez compléter le(s) champ(s) vide(s).',
      status: 422
    },
    'email-not-verified': {
      message: 'Veuillez vérifier votre adresse mail avant de vous connecter.',
      status: 403
    },
    'auth/user-disabled': {
      message: 'Ce compte utilisateur a été désactivé.',
      status: 403
    },
    'auth/invalid-credential': {
      message: 'Adresse mail et/ou mot de passe incorrect(s).',
      status: 403
    },
    default: {
      message: 'Une erreur est survenue lors de la connexion.',
      status: 500
    }
  },

  userCreation: {
    'missing-item': {
      message: 'Veuillez compléter le(s) champ(s) vide(s).',
      status: 422
    },
    'auth/email-already-in-use': {
      message: 'Cette adresse email est déjà utilisée.',
      status: 400
    },
    'auth/invalid-email': {
      message: "L'adresse email fournie n'est pas valide.",
      status: 400
    },
    'auth/weak-password': {
      message: 'Le mot de passe est trop faible.',
      status: 400
    },
    'auth/too-many-requests': {
      message: 'Trop de requêtes envoyées. Veuillez réessayer plus tard.',
      status: 429
    },
    default: {
      message: "Une erreur est survenue lors de la création de l'utilisateur.",
      status: 500
    }
  },

  passwordReset: {
    'missing-item': {
      message: 'Veuillez entrer une adresse mail.',
      status: 422
    },
    'auth/user-not-found': { message: 'Utilisateur non trouvé.', status: 404 },
    'auth/invalid-email': {
      message: "L'adresse email fournie n'est pas valide.",
      status: 400
    },
    'auth/too-many-requests': {
      message: 'Trop de requêtes envoyées. Veuillez réessayer plus tard.',
      status: 429
    },
    default: {
      message:
        'Une erreur est survenue lors de la réinitialisation du mot de passe.',
      status: 500
    }
  },

  logout: {
    default: { message: 'Erreur de serveur interne.', status: 500 }
  },
  tokenVerification: {
    'user-disconnected': {
      message: "L'utilisateur est déconnecté.",
      status: 403
    },
    'auth/argument-error': {
      message: 'Le format du token est invalide.',
      status: 400
    },
    'auth/user-not-found': {
      message: 'Utilisateur non trouvé ou supprimé.',
      status: 403
    },
    'auth/id-token-expired': { message: 'Le token a expiré.', status: 401 },
    'auth/id-token-revoked': {
      message: 'Le token a été révoqué.',
      status: 401
    },
    'auth/invalid-id-token': {
      message: 'Le token fourni est invalide.',
      status: 403
    },
    'error-creation': {
      message: 'Erreur de création du token personnalisé.',
      status: 403
    },
    default: { message: 'Non-autorisé.', status: 403 }
  }
}

const handleError = (type, error, res) => {
  const errorType = errorMessages[type] || errorMessages.default
  const { message, status } = errorType[error] || errorType.default
  res.status(status).json({ message })
}

const handleAuthenticationError = (error, res) =>
  handleError('authentication', error, res)
const handleUserCreationError = (error, res) =>
  handleError('userCreation', error, res)
const handlePasswordResetError = (error, res) =>
  handleError('passwordReset', error, res)
const handleLogoutError = (error, res) => handleError('logout', error, res)
const handleTokenVerificationError = (error, res) =>
  handleError('tokenVerification', error, res)

module.exports = {
  handleAuthenticationError,
  handleUserCreationError,
  handlePasswordResetError,
  handleLogoutError,
  handleTokenVerificationError
}
