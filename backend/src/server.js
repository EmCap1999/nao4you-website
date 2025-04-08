const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require('./routes/firebase.auth.routes')
const { handleServerError } = require('./errors/server.errors')

const app = express()
const PORT = process.env.PORT

async function startServer() {
  if (!process.env.PORT) {
    console.error('Please define the PORT in your .env file.')
    process.exit(1)
  }

  try {
    app.use(express.json())
    app.use(cookieParser())
    app.use(router)

    app.use((err, req, res, next) => {
      console.error('Server error:', err)
      return handleServerError(err, res)
    })

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}.`)
    })
  } catch (error) {
    console.error('Node Server startup error:', error)
    process.exit(1)
  }
}
;(async () => {
  try {
    await startServer()
  } catch (error) {
    console.error('Failed to start the server:', error)
    process.exit(1)
  }
})()
