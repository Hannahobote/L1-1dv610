import { SimpleAuth } from './src/controller/simpleAuth.js'
import dotenv from 'dotenv'
dotenv.config()

try {
  // connect to the module and put your mongo databse connection string as parameter.
  const auth = new SimpleAuth(process.env.DB_CONNECTION_STRING)

  // Register a user
  // await auth.regiterUser('hannah3', 'password')

  // Sign in a user
  await auth.signIn('hannah3', 'password')

  // Get current user
  console.log('current user:', await auth.getCurrentSignedInUser())

  // Sign out user
  await auth.signOut(await auth.signOut())

  // Get all users

} catch (error) {
  console.log(error)
}