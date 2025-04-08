const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require('./routes/firebase.auth.routes')
const { getServerErrorInfo } = require('./errors/server.errors')

const app = express()
const PORT = process.env.PORT

async function startServer() {
  if (!process.env.PORT) {
    console.error('❌ Error: Please define the PORT in your .env file.')
    process.exit(1)
  }

  try {
    app.use(express.json())
    app.use(cookieParser())
    app.use(router)

    app.use((err, req, res, next) => {
      const { message, status } = getServerErrorInfo(err)
      console.error(`❌ Error (${status}): ${message}`)
      return res.status(status).json({ error: message })
    })

    app.listen(PORT, () => {
      console.log(`✅ Node.js server is running on port ${PORT}.`)
    })
  } catch (error) {
    const { message, status } = getServerErrorInfo(error)
    console.error(`❌ Node Server startup error (${status}):`, error)
    console.error(message)
    process.exit(1)
  }
}
;(async () => {
  try {
    await startServer()
  } catch (error) {
    const { message, status } = getServerErrorInfo(error)
    console.error(`❌ Failed to start the server (${status}):`, error)
    console.error(message)
    process.exit(1)
  }
})()
