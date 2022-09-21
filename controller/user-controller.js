import bcrypt from 'bcrypt'
import { userDb } from '../user-mock-db.js'
import { v4 as uuidv4 } from 'uuid';

export class User {


  // the other crud operations?

  getUsers (req, res, next) {
    res.send(userDb)
  }


async registerUser (req, res, next) {
    // if there is no req body, throw error
    if(!req.body.username && !req.body.password) {
      res.status(412).send({error: 'username and password requierd in the body'})
    }
    
    const username = req.body.username
    const password = req.body.password
    const hashPassword = await bcrypt.hash(password, 10)

    // find duplicate user
    const duplicateUser = userDb.find(dupeUsername => dupeUsername.username === username)

    if(duplicateUser) {
      res.status(400).send('Username already takes, use another one.')
    } else {
      userDb.push({ id: uuidv4() ,username, password: hashPassword})
      res.sendStatus(201)
    }

  }
}