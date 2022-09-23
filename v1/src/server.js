import express from 'express'
import logger from 'morgan'
import session from 'express-session'
import { router } from './routes/router.js'

export const userDb = []
const app = express()
app.use(express.json())
app.use(logger('dev')) // logs all the http requests. FIX LATER 
app.use(express.urlencoded({ extended: false })) // makes the req.body object

let options = {
  name: 'session',
  secret: 'my-auth-app',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    maxAge: 1800000,
    httpOnly: true,
    sameSite: 'lax'
  },
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  options.cookie.secure = true // serve secure cookies
}

app.use(session(options))

app.use('/', router) // Register routess
//ladda ned lnu lint


// start server
app.listen(3000)
