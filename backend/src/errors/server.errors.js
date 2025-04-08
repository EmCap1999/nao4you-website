function getServerErrorMessage(errorCode) {
  switch (errorCode) {
    case 'EACCES':
      return "Permission refusée. Veuillez vérifier vos droits d'accès."
    case 'EADDRINUSE':
      return 'Adresse déjà utilisée. Veuillez vérifier si le port est déjà utilisé.'
    case 'ENOTFOUND':
      return 'Serveur non trouvé. Veuillez vérifier la configuration de votre serveur.'
    case 'ECONNREFUSED':
      return 'Connexion refusée. Veuillez vérifier la connexion de votre serveur.'

    default:
      console.error(`Unknown server error code: ${errorCode}`)
      return "Une erreur inconnue s'est produite lors du démarrage du serveur."
  }
}

module.exports = { getServerErrorMessage }
