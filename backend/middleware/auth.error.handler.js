const handleAuthenticationError = (error, res) => {
  let errorMessage

  switch (error) {
    case 'missing-item':
      errorMessage = 'Veuillez compléter le(s) champ(s) vide(s).'
      res.status(422).json({ message: errorMessage })
      break
    case 'email-not-verified':
      errorMessage =
        'Veuillez vérifier votre adresse mail avant de vous connecter.'
      res.status(403).json({ message: errorMessage })
      break
    case 'auth/user-disabled':
      errorMessage = 'Ce compte utilisateur a été désactivé.'
      res.status(403).json({ message: errorMessage })
      break
    case 'auth/invalid-credential':
      errorMessage = 'Adresse mail et/ou mot de passe incorrect(s).'
      res.status(403).json({ message: errorMessage })
      break
    default:
      errorMessage = 'Une erreur est survenue lors de la connexion.'
      res.status(500).json({ message: errorMessage })
      break
  }
}

const handleUserCreationError = (error, res) => {
  console.error("Erreur lors de la création de l'utilisateur :", error)
  let errorMessage

  switch (error) {
    case 'missing-item':
      errorMessage = 'Veuillez compléter le(s) champ(s) vide(s).'
      res.status(422).json({ message: errorMessage })
      break
    case 'auth/email-already-in-use':
      errorMessage = 'Cette adresse email est déjà utilisée.'
      res.status(400).json({ message: errorMessage })
      break
    case 'auth/invalid-email':
      errorMessage = "L'adresse email fournie n'est pas valide."
      res.status(400).json({ message: errorMessage })
      break
    case 'auth/weak-password':
      errorMessage = 'Le mot de passe est trop faible.'
      res.status(400).json({ message: errorMessage })
      break
    default:
      errorMessage =
        "Une erreur est survenue lors de la création de l'utilisateur."
      res.status(500).json({ message: errorMessage })
      break
  }
}

const handleEmailVerificationError = (error, res) => {
  console.log(error)
  let errorMessage

  switch (error) {
    case 'auth/invalid-email':
      errorMessage = "L'adresse email fournie n'est pas valide."
      res.status(400).json({ message: errorMessage })
      break
    case 'auth/too-many-requests':
      errorMessage = 'Trop de requêtes envoyées. Veuillez réessayer plus tard.'
      res.status(429).json({ message: errorMessage })
      break
    default:
      errorMessage = "Problème d'envoi de l'email de vérification."
      res.status(500).json({ message: errorMessage })
      break
  }
}

const handlePasswordResetError = (error, res) => {
  console.log(error)
  let errorMessage

  switch (error) {
    case 'missing-item':
      errorMessage = 'Veuillez entrer une adresse mail.'
      res.status(422).json({ message: errorMessage })
      break
    case 'auth/user-not-found':
      errorMessage = 'Utilisateur non trouvé.'
      res.status(404).json({ message: errorMessage })
      break
    case 'auth/invalid-email':
      errorMessage = "L'adresse email fournie n'est pas valide."
      res.status(400).json({ message: errorMessage })
      break
    case 'auth/too-many-requests':
      errorMessage = 'Trop de requêtes envoyées. Veuillez réessayer plus tard.'
      res.status(429).json({ message: errorMessage })
      break
    default:
      errorMessage =
        'Une erreur est survenue lors de la réinitialisation du mot de passe.'
      res.status(500).json({ message: errorMessage })
      break
  }
}

const handleLogoutError = (error, res) => {
  console.log(error)
  res.status(500).json({ message: 'Erreur de serveur interne.' })
}

const handleTokenVerificationError = (error, res) => {
  console.log(error)
  let errorMessage

  switch (error) {
    case 'user-disconnected':
      errorMessage = "L'utilisateur est déconnecté."
      res.status(403).json({ message: errorMessage })
      break
    case 'auth/argument-error':
      errorMessage = 'Le format du token est invalide.'
      res.status(400).json({ message: errorMessage })
      break
    case 'auth/user-not-found':
      errorMessage = 'Utilisateur non trouvé ou supprimé.'
      res.status(403).json({ message: errorMessage })
      break
    case 'auth/id-token-expired':
      errorMessage = 'Le token a expiré.'
      res.status(401).json({ message: errorMessage })
      break
    case 'auth/id-token-revoked':
      errorMessage = 'Le token a été révoqué.'
      res.status(401).json({ message: errorMessage })
      break
    case 'auth/invalid-id-token':
      errorMessage = 'Le token fourni est invalide.'
      res.status(403).json({ message: errorMessage })
      break
    case 'error-creation':
      errorMessage = 'Erreur de création du token personnalisé.'
      res.status(403).json({ message: errorMessage })
      break
    default:
      errorMessage = 'Non-autorisé.'
      res.status(403).json({ message: errorMessage })
      break
  }
}

module.exports = {
  handleAuthenticationError,
  handleUserCreationError,
  handleEmailVerificationError,
  handlePasswordResetError,
  handleLogoutError,
  handleTokenVerificationError
}
