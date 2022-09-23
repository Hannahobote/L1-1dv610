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
    const user = new User({ username, password: hashPassword, authenticated: false })
    user.save()
    return user
  }


  async signIn(username, password) {
    try {
      // find user in database
      const user = await this.findOneUserByhUsername(username)
      // compare password
      if (this.isPasswordCorrect(password, user.password)) {
        // if passowrd true, auth user
        await this.authenticateUser(user.username)
      } else {
        throw new Error('wrong credentials')
      }

    } catch (error) {
      console.log(error)
    }

  }

  async findOneUserByhUsername(username) {
    // find user in database
    const user = await User.findOne({ username })
    if (user) {
      return user
    } else {
      throw new Error('User not found')
    }
  }

  async isPasswordCorrect(typedInPassword, actuallPassword) {
    return await bcrypt.compare(typedInPassword, actuallPassword)
  }

  async authenticateUser(username) {
    // set user as logged in
    await User.updateOne({ username }, {
      authenticated: true
    })
    this.setSurrentSignedInUser(username)

    console.log('user logged in')
  }

  async signOut(currentUser) {
    // find user in database and update athentication state
    await User.updateOne({ username: currentUser }, {
      authenticated: false
    })
    this.setSurrentSignedInUser(null)
    console.log('user logged out')
  }

  // id of current signed in user set whilet login in
  async setSurrentSignedInUser(username) {
    this.currentUser = username
  }

  async getCurrentSignedInUser() {
    return this.currentUser
  }
}