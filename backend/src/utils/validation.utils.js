function validateRequest(obj, res, status = 400) {
  const missingFields = Object.entries(obj)
    .filter(
      ([key, value]) => value === undefined || value === null || value === '',
    )
    .map(([key]) => `Le champ ${key} est requis.`)

  if (missingFields.length > 0) {
    res.status(status).json({ errors: missingFields })
    return true
  }

  return false
}

module.exports = {
  validateRequest,
}
