import { SimpleAuth } from "./src/controller/simpleAuth.js"
import { ConfigMongoose } from "./src/model/mongoose.js"

// make a case for when it works
// make a case for when it doesnt work

export class Test {
  constructor () {
    this.auth = new SimpleAuth(process.env.DB_CONNECTION_STRING)
    this.database = new ConfigMongoose(process.env.DB_CONNECTION_STRING)
  }

  checkDuplicateUser () {
    // ?? 
  }

  signInComplete () {
    // when signed in, authenticated= true
  }

  signoutComplete() {
    // when signedOut,authenticated=false
  }

  currentUserValid() {
    // when current user is signed in, user object should atleast include key value pairs of username,password, autheticated=true
  }

  passowrdCorrect () {
    // case for when password is correct
    // case for password incorrect ???
  }

}