import { userDb } from '../user-mock-db.js'
import bcrypt from 'bcrypt'
import { runInNewContext } from 'vm'

export class Auth {

  async login(req, res, next) {
    const user = userDb.find(username => username.username === req.body.username)

    console.log(user, '..', req.body.username)

    if (user) {
      // compare password with bcrypt 
      if (bcrypt.compare(req.body.password, user.password)) {
        res.status(200).send('user logged in')
        // set session cookies 
        
      } else {
        res.status(404).send('user not found')
      }
    } else {
      return res.status(400).send('User not found')
    }

  }

  async logout(req, res, next) {

  }

}