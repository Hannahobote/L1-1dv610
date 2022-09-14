import bcrypt from 'bcrypt'
import { userDb } from '../user-mock-db.js'

export class User {


  // the other crud operations?

  getUsers (req, res, next) {
    res.send(userDb)
  }


async registerUser (req, res, next) {
    // will push an object that contains username and password 
    
    // if there is no req body, thow error
    if(!req.body.username && !req.body.password) {
      res.status(412).send({error: 'username and password requierd in the body'})
    }
    
    const username = req.body.username
    const password = req.body.password
    const hashPassword = await bcrypt.hash(password, 10)

    userDb.push({username, password: hashPassword})
    res.sendStatus(201)
  }
}