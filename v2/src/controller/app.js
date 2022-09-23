import { SimpleAuth } from "./simpleAuth"

try {
  const auth = SimpleAuth(process.env.DB_CONNECTION_STRING)
  
} catch (error) {
  console.log(error)
}