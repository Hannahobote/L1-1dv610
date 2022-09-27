import { SimpleAuth } from '../controller/simpleAuth.js'
import dotenv from 'dotenv'
dotenv.config()

try {
  // connect to the module and put your mongo databse connection string as parameter.
  const auth = new SimpleAuth(process.env.DB_CONNECTION_STRING)

  // Register a user
  // console.log('Register user', await auth.register('hannah6', 'password'))

  // Sign in a user
  await auth.signIn('hannah3', 'password')

  // Get current user
  console.log('current user:', await auth.getCurrentSignedInUser())

  // Sign out user
  console.log('Sign out', await auth.signOut())

  // Get all users
  console.log('All the users in the database', await auth.getAllUsers())
} catch (error) {
  console.log(error)
}
