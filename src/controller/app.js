import { userDatabase } from '../model/usersMockDatabase.js';
import { User } from '../model/user.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export class App {

  constructor() {
    this.database = new userDatabase()
  }

  async getAllUsers(req, res, next) {
    try {
      res.send(this.database.getDatabase())
    } catch (error) {
      next(error)
    }
  }

  async registerUser(req, res, next) {
    try {
      // if there is no req body, throw error
      if (!req.body.username || !req.body.password) {
        res.status(412).send({ error: 'username and password requierd in the body' })
      }

      const username = req.body.username
      const password = req.body.password
      const hashPassword = await bcrypt.hash(password, 10)

      // find duplicate user
      const duplicateUser = this.database.getDatabase().find(dupeUsername => dupeUsername.username === username)

      if (duplicateUser) {
        res.status(400).send('Username already taken, use another one.')
      } else {
        const newUser = new User(uuidv4(), username, hashPassword)
        this.database.addUser(newUser)
        res.sendStatus(201)
      }
    } catch (error) {
      next(error)
    }


  }

  async login(req, res, next) {

    try {
      const user = this.database.getDatabase().find(username => username.username === req.body.username)
      console.log(user)

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