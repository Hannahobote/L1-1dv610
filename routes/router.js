import express from 'express'
import { User } from '../controller/user-controller.js'
import { Auth } from '../controller/auth-controller.js'
const user = new User()
const auth = new Auth()
export const router = express.Router()


// get all user 
router.get('/user', (req, res, next) => user.getUsers(req, res, next))

// create user 
router.post('/user', (req, res, next) => user.registerUser(req, res, next))


// login 
router.post('/login',(req, res, next) => auth.login(req, res, next))

// logout 
router.post('/logout',(req, res, next) => auth.logout(req, res, next))