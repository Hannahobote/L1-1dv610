import {User} from '../model/user-model.js'
import bcrypt from bcrypt
import { ConfigMongoose } from "../model/mongoose";
import mongoose from 'mongoose'

export class SimpleAuth {

  constructor(databaseConnectionString) {
    this.database = new ConfigMongoose(databaseConnectionString)
    this.database.connectDatabase()
  }

  
  async regiterUser(username, password) {
    // check if theres is username or password
    if(!username || !password) {
      throw new Error('Use must have username and password')
    }

    // check id theres a dulicate user
    const duplicateUser= await User.findOne({username})
    if(username === duplicateUser) {
      throw new Error ('Username must be unique')
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({username, hashesPassword})
    
  }


  signIn () {


  }

  signOut () {

  }

  // save current loggedin user in localstorage?
  currentSignedInUser() {

  }
}