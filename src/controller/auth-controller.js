import { userDb } from '../server.js'
import bcrypt from 'bcrypt'

export class Auth {

  async login(req, res, next) {
    try {
      const user = userDb.find(username => username.username === req.body.username)

      if (user) {

        // compare password with bcrypt. if password incorrect, throw error
        if (await bcrypt.compare(req.body.password, user.password)) {

          // set session cookies 
          req.session.user = user.id
          req.session.save()

          res.status(200).send('user logged in')

        } else {
          res.status(401).send('wrong credentials') // 403?
        }
      } else {
        res.status(400).send('User not found')
      }
    } catch (error) {
      next(error)
    }

  }


  async logout(req, res, next) {
    try {
      //console.log(':: before logout ', req.session)

      req.session.destroy()
      // console.log(req.session)
      res.send('User logged out')
    } catch (error) {
      next(error)
    }
  }

}