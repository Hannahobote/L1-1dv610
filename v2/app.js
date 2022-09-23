import { SimpleAuth } from "./src/controller/simpleAuth.js"
import dotenv from 'dotenv'
dotenv.config()

try {
  const auth = new SimpleAuth(process.env.DB_CONNECTION_STRING)
  //await auth.regiterUser('hannah3', 'password')
  await auth.signIn('hannah3', 'password')
  console.log('current user:', await auth.getCurrentSignedInUser())
  //await auth.signOut(await auth.getCurrentSignedInUser())
  
  
} catch (error) {
  console.log(error)
}