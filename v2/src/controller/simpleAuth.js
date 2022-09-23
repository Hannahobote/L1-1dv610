import { User } from '../model/user-model.js'
import { ConfigMongoose } from "../model/mongoose.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export class SimpleAuth {

  constructor(databaseConnectionString) {
    this.database = new ConfigMongoose(databaseConnectionString)
    this.database.connectDatabase()
    this.currentUser = null
  }


  async regiterUser(username, password) {
    // check if theres is username or password
    if (!username || !password) {
      throw new Error('Use must have username and password')
    }

    // check id theres a dulicate user
    const duplicateUser = await User.findOne({ username })
    if (username === duplicateUser) {
      throw new Error('Username must be unique')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashPassword, authenticated: false})
    user.save()
    return user
  }


  async signIn(username, password) {
    try {
      // find user in database
      const user = await User.findOne({ username })

      if (user) {

        // compare password with bcrypt. if password incorrect, throw error
        if (await bcrypt.compare(password, user.password)) {

          // set user as logged in
         const results = await User.updateOne({ username } , {
            authenticated: true
          })

          if(user.authenticated) {

            this.setSurrentSignedInUser(user.username)
            console.log('user logged in')
          } else {
            throw new Error ('An error happened whilst signin in, please try again')
          }

        } else {
          throw new Error('wrong credentials')
        }
      } else {
        throw new Error('User not found')
      }

    } catch (error) {
      console.log(error)
    }

  }

  async signOut(currentUser) {
    try {
      // find user in database and update athentication state
      const result = await User.updateOne({ username: currentUser} , {
        authenticated: false
      })
      
      console.log('user logged out')
    } catch (error) {
      console.log(error)
    }
  }

  // id of current signed in user set whilet login in
  async setSurrentSignedInUser(username) {
    this.currentUser = username
  }

  async getCurrentSignedInUser() {
    return await User.findOne({username: this.currentUser})
  }
}