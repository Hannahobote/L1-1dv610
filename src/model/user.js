export class User {
  /**
   * The user consists of:
   * @param {Char} id 
   * @param {String} username 
   * @param {String} password 
   */
  constructor(id, username, password) {
    this.id = id
    this.username = username
    this.password = password
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
}