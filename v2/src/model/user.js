export class User {
  /**
   * The user consists of:
   * @param {String} id 
   * @param {String} username 
   * @param {String} password 
   */
  constructor(id, username, password) {
    /** @type {String} */
    this.id = id
    /** @type {String} */
    this.username = username
    /** @type {String} */
    this.password = password
    /** @type {Boolean} */
    this.signedIn = false
  }

  getId() {
    return this.id
  }

  setId(id) {
    this.id = id
  }

  getUsername() {
    return this.username
  }

  setUsername(name) {
    this.username = name
  }

  getPassword() {
    return this.password
  }

  setPassword(password) {
    this.password = password
  }


  getStatus() {
    return this.signedIn
  }

  setStatus(status) {
    this.signedIn = status
  }
}