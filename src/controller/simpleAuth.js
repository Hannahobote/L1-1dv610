import { ConfigMongoose } from '../model/mongoose.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Module starting point.
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
   * @returns {object} an object of the user info.
   */
  async register (username, password) {
    // mongodb will check if theres is username or password
    // mongodb will check if theres a duplicate user

    // hash the pasword with bcrypt
    const hashPassword = await bcrypt.hash(password, 10)
    const user = this.database.addUser(username, hashPassword)
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
      const user = await this.database.findOneByUsername(username)

      // compare password
      if (this.isPasswordCorrect(password, user.password)) {
        // if passowrd true, auth user
        await this.authenticateUser(user.id)
      }
    } catch (error) {
      console.log(error)
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
   * @param {string} userId user id.
   */
  async authenticateUser (userId) {
    /** @type {object} object of user details */
    const user = await this.database.updateUser(userId, { authenticated: true })
    this.setCurrentSignedInUser(user)
    console.log('user logged in')
  }

  /**
   *Sign out user.
   *
   * @returns {object} object of user.
   */
  async signOut () {
    /** @type {object} object of current user */
    const user = await this.getCurrentSignedInUser()

    // find user in database and update athentication state
    /** @type {object} object of user info */
    const updatedUser = await this.database.updateUser(user, { authenticated: false })

    this.currentUser = null
    return updatedUser
  }

  /**
   * Object of current signed in user.
   *
   * @param {object} userObject object of current user.
   */
  async setCurrentSignedInUser (userObject) {
    this.currentUser = userObject
  }

  /**
   * See who is currently signed in.
   *
   * @returns {object} object of current user.
   */
  async getCurrentSignedInUser () {
    return this.currentUser
  }

  /**
   * Find all users.
   *
   * @returns {object[]} object array of all the users in the database.
   */
  async getAllUsers () {
    return this.database.findAll()
  }
}
