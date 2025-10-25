import express from 'express'
import * as registrationController from '../controllers/registrationCTL'
const router = express.Router()

router.post('/register', registrationController.createNewAccount)
export default router