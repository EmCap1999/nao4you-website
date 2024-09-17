const errorMessages = {
  setUser: {
    'not-found': {
      message: "Le document spécifié n'a pas été trouvé.",
      status: 404
    },
    'failed-precondition': {
      message:
        "La précondition requise n'a pas été satisfaite pour cette opération.",
      status: 400
    },
    unavailable: {
      message:
        'Le service est temporairement indisponible. Veuillez réessayer plus tard.',
      status: 503
    },
    'resource-exhausted': {
      message:
        'Les limites de quota ont été dépassées. Veuillez réessayer plus tard.',
      status: 429
    },
    cancelled: {
      message: "L'opération a été annulée.",
      status: 499
    },
    'invalid-argument': {
      message: 'Un argument invalide a été fourni pour cette opération.',
      status: 400
    },
    internal: {
      message:
        "Une erreur interne s'est produite. Veuillez réessayer plus tard.",
      status: 500
    },
    default: { message: 'Non-autorisé.', status: 403 }
  }
}

const handleError = (type, error, res) => {
  const errorType = errorMessages[type] || errorMessages.default
  const { message, status } = errorType[error] || errorType.default
  res.status(status).json({ message })
}

const handleSetUserError = (error, res) => handleError('setUser', error, res)

module.exports = {
  handleSetUserError
}
