import { User } from './user.js'
export class userDatabase {
  constructor() {

    /** @type {User} */
    this.database = []
  }

  /**
   * @returns {User} the entire database
   */
  getDatabase() {
    return this.database
  }

  /**
   * Adds member to the db.
   * @param {User} user 
   */
  addUser(user) {
    this.database.push(user)
  }

  // behövs detta?
  deleteUser(){

  }
}