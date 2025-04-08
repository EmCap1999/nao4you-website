function getServerErrorInfo(error) {
  const errorCode = error.code || error

  switch (errorCode) {
    case 'EACCES':
      return {
        message: "Permission refusée. Veuillez vérifier vos droits d'accès.",
        status: 403,
      }

    case 'EADDRINUSE':
      return {
        message:
          'Adresse déjà utilisée. Veuillez vérifier si le port est déjà utilisé.',
        status: 409,
      }

    case 'ENOTFOUND':
      return {
        message:
          'Serveur non trouvé. Veuillez vérifier la configuration de votre serveur.',
        status: 404,
      }

    case 'ECONNREFUSED':
      return {
        message:
          'Connexion refusée. Veuillez vérifier la connexion de votre serveur.',
        status: 503,
      }

    case 'ETIMEDOUT':
      return {
        message: "Délai d'attente dépassé. Le serveur n'a pas répondu à temps.",
        status: 504,
      }

    case 'ENETUNREACH':
      return {
        message:
          'Réseau inaccessible. Veuillez vérifier votre connexion réseau.',
        status: 502,
      }

    case 'ECONNRESET':
      return {
        message: 'La connexion a été réinitialisée. Veuillez réessayer.',
        status: 502,
      }

    case 'EPIPE':
      return {
        message: 'Connexion interrompue de manière inattendue.',
        status: 500,
      }

    default:
      console.error(`Erreur serveur non gérée: ${errorCode}`, error)
      return {
        message:
          "Une erreur inconnue s'est produite lors du démarrage du serveur.",
        status: 500,
      }
  }
}

function handleServerError(error, res) {
  const { message, status } = getServerErrorInfo(error)
  return res.status(status).json({ error: message })
}

module.exports = {
  getServerErrorInfo,
}
