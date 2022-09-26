import { User } from '../model/user-model.js'
import { ConfigMongoose } from '../model/mongoose.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Moddule starting point.
 */
export class SimpleAuth {
  /**
   * Connect to database of your choice.
   *
   * @param {string} databaseConnectionString mongodb connection string. Upload from dotenv file.
   */
  constructor (databaseConnectionString) {
    this.database = new ConfigMongoose(databaseConnectionString)
    this.database.connectDatabase()
    this.currentUser = null
  }

  /**
   * Register the user.
   *
   * @param {string} username the username.
   * @param {string} password the password.
   */
  async regiterUser (username, password) {
    // mongodb will check if theres is username or password
    // mongodb will check if theres a duplicate user

    // hash the pasword with bcrypt
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashPassword, authenticated: false })
    user.save()
    return user
  }

  /**
   *Sign in user.
   *
   * @param {string} username name of user.
   * @param {string} password password of user.
   */
  async signIn (username, password) {
    try {
      // find user in database
      const user = await this.findOneUserByUsername(username)
      // compare password
      if (this.isPasswordCorrect(password, user.password)) {
        // if passowrd true, auth user
        await this.authenticateUser(user.username)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   *Find one user in database.
   *
   * @param {string} username username
   */
  async findOneUserByUsername (username) {
    const user = await User.findOne({ username })
    if (user) {
      return user
    } else {
      throw new Error('User not found')
    }
  }

  /**
   *
   * @param id
   */
  async findOneUserById (id) {
    const user = await User.findOne({ id })
    if (user) {
      return user
    } else {
      throw new Error('User not found')
    }
  }

  /**
   *Checks if password is correct.
   *
   * @param {string} typedInPassword passowerd typed by user.
   * @param {string} actuallPassword password stroed in database
   * @returns {boolean} returns true if password is correct, else false.
   */
  async isPasswordCorrect (typedInPassword, actuallPassword) {
    const correct = await bcrypt.compare(typedInPassword, actuallPassword)
    if (correct) {
      return correct
    } else {
      throw new Error('wrong credentials')
    }
  }

  /**
   * Authenticate user and set autheticated=true.
   *
   * @param {string} username username.
   */
  async authenticateUser (username) {
    // set user as logged in
    await User.updateOne({ username }, {
      authenticated: true
    })
    this.setCurrentSignedInUser(username)
    console.log('user logged in')
  }

  /**
   *Sign out user.
   *
   */
  async signOut () {
    const user = await this.getCurrentSignedInUser().username
    console.log(user)
    // find user in database and update athentication state
    await User.updateOne({ user }, {
      authenticated: false
    })
    this.currentUser = null
    console.log('user logged out', await this.findOneUserByUsername(user))
  }

  /**
   * Object of current signed in user.
   *
   * @param {string} username username.
   */
  async setCurrentSignedInUser (username) {
    const user = this.findOneUserByUsername(username)
    this.currentUser = user
  }

  /**
   * See who is currently signed in.
   *
   * @returns {object} object of current user.
   */
  async getCurrentSignedInUser () {
    return this.currentUser
  }

  getAllUsers () {

  }
}
