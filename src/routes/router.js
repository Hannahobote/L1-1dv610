import express from 'express'
import { App } from '../controller/app.js'
const controller = new App()
export const router = express.Router()


// get all user 
router.get('/user', (req, res, next) => controller.getAllUsers(req, res, next))

// create user 
router.post('/user', (req, res, next) => controller.registerUser(req, res, next))

// login 
router.post('/login',(req, res, next) => controller.login(req, res, next))

// logout 
router.post('/logout',(req, res, next) => controller.logout(req, res, next))