import mongoose from 'mongoose'
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
   *Connects to the mongo database.
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
}
