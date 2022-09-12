import express from 'express'
import logger from 'morgan'
import {router} from './routes/router.js'

const app = express()

app.use(express.json())

// Register routes.
app.use('/', router)

 // Set up a morgan logger using the dev format for log entries.
 app.use(logger('dev'))

 //ladda ned lnu lint

 // Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))


app.listen(3000)