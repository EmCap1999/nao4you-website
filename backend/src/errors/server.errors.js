function getServerErrorInfo(errorCode) {
  switch (errorCode) {
    case 'EACCES':
      return {
        message: "Permission refusée. Vérifiez vos droits d'accès.",
        status: 403,
      }
    case 'EADDRINUSE':
      return {
        message: 'Port déjà utilisé. Un autre processus l’occupe peut-être.',
        status: 409,
      }
    case 'ECONNREFUSED':
      return {
        message:
          'Connexion refusée. Vérifiez que le serveur distant est actif.',
        status: 503,
      }
    case 'ETIMEDOUT':
      return {
        message: "Délai d'attente dépassé. Le serveur n'a pas répondu à temps.",
        status: 504,
      }
    case 'ENETUNREACH':
      return {
        message: 'Réseau inaccessible. Vérifiez votre connexion réseau.',
        status: 502,
      }
    case 'ENOTFOUND':
      return { message: 'Serveur ou ressource introuvable.', status: 404 }

    default:
      console.error(`Erreur serveur non gérée: ${errorCode}`)
      return {
        message: "Une erreur inconnue s'est produite au lancement du serveur.",
        status: 500,
      }
  }
}

function handleServerError(error, res) {
  const errorCode = error.code || error || 'unknown'
  const { message, status } = getServerErrorInfo(errorCode)
  return res.status(status).json({ error: message })
}

module.exports = {
  handleServerError,
}
