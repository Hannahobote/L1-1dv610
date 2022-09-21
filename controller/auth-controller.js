import { userDb } from '../user-mock-db.js'
import bcrypt from 'bcrypt'
import session from 'express-session'

export class Auth {

  async login(req, res, next) {
    const user = userDb.find(username => username.username === req.body.username)

    if (user) {

      // compare password with bcrypt. if password incorrect, throw error
      if (await bcrypt.compare(req.body.password, user.password)) {

        // set session cookies . If user is already logged in, send messege back. orelse set the session and send cookie back
       // res.set('Set-Cookie', `session=${user.id}`)
       req.session.regenerate(() => {
         req.session.authenticated = true
         req.session.username = user.username
         req.session.userId = user.id
        })
        
        console.log(req.session)
       res.status(200).send('user logged in. Check headers for session cookies.')

      } else {
        res.status(401).send('wrong credentials') // 403?
      }
    } else {
      res.status(400).send('User not found')
    }

  }


  async logout(req, res, next) {

  }

}