import { equal } from 'assert'
import bcrypt from 'bcrypt'

export class User {

  constructor() {
    this.userDb = []
  }

  getUserDB (req, res, next) {
    res.json(this.userDb)
  }


async registerUser (req, res, next) {
    // will push an object that contains username and password 
    // if there is no req body, thow error
    if(!req.body) {
      res.send('body requried')
    }
    const username = req.body.username
    const password = req.body.password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log({username, password: hashPassword})
    this.userDb.push({username, password: hashPassword})
    res.status(201)
  }
}