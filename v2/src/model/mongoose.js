import mongoose from 'mongoose'
import { User } from '../model/user-model.js'
// copied form Mats and Johan

/**
 * Connect and start mongodb.
 */
export class ConfigMongoose {
  /**
   * Connect to mongo db of choise.
   *
   * @param {string} databaseConnectionString mongodb connection string. Upload from dotenv file.
   */
  constructor (databaseConnectionString) {
    this.databaseConnectionString = databaseConnectionString
  }

  /**
   *Connects to the mongo database. Copied from Mats and Johan.
   *
   * @returns {string} Mongoose connection status message
   */
  connectDatabase () {
    try {
      mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
      mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
      mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

      // If the Node process ends, close the Mongoose connection.
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log('Mongoose connection is disconnected due to application termination.')
          process.exit(0)
        })
      })

      // Connect to the server.
      return mongoose.connect(this.databaseConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  /**
   * Find all the users.
   *
   * @returns {object[]} returns info of all the users.
   */
  async findAll () {
    return await User.find({})
  }

  /**
   * Add a user to the database.
   *
   * @param {string} username username
   * @param {string} userPassword hashed password!
   * @returns {object} object of user.
   */
  async addUser (username, userPassword) {
    const user = new User({ username, password: userPassword, authenticated: false })
    user.save()
    return user
  }

  /**
   * Find user by username.
   *
   * @param {string} name username
   * @returns {object} object of user.
   */
  async findOneByUsername (name) {
    const user = await User.findOne({ username: name })
    return user
  }

  /**
   * Find one user in the database.
   *
   * @param {string} userId id of the user.
   * @returns {object} object of user information.
   */
  async findOneById (userId) {
    const user = await User.findOne({ id: userId })
    return user
  }

  /**
   * Update any infomration of the user.
   *
   * @param {string} userId id of the user.
   * @param {object} object of updated information.
   * @returns {object} object of user information
   */
  async updateUser (userId, object) {
    await User.updateOne({ id: userId }, object)
    return this.findOneById(userId)
  }
}
