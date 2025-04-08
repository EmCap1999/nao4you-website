function validateRequest(obj = {}, res, status = 400) {
  const missingFields = Object.entries(obj)
    .filter(
      ([_, value]) => value === undefined || value === null || value === '',
    )
    .map(([key]) => `Le champ "${key}" n’a pas été fourni.`)

  if (missingFields.length > 0) {
    res.status(status).json({ errors: missingFields })
    return true
  }

  return false
}

module.exports = {
  validateRequest,
}
