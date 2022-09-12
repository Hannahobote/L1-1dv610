import express from 'express'
import { User } from '../controller/user-controller.js'
const user = new User()
export const router = express.Router()


// get all user 
router.get('/user', (req, res, next) => user.getUserDB(req, res, next))

// create user 
router.post('/user', (req, res, next) => user.registerUser(req, res, next))