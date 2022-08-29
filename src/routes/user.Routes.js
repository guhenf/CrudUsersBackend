import { Router } from 'express'
import {
	createUserController,
	deleteUserController,
	listUsersController,
	loggedUserController,
	loginUserController,
	retrieveUserController,
	updateUserController,
} from '../controllers/user.Controller'
import authAdmMiddleware from '../middlewares/authAdm.middleware'
import authTokenMiddleware from '../middlewares/authToken.middleware'

const userRoutes = Router()
const loginRoute = Router()

userRoutes.post('', createUserController)
loginRoute.post('', loginUserController)
userRoutes.get('', authTokenMiddleware, authAdmMiddleware, listUsersController)
userRoutes.get('/profile', authTokenMiddleware, loggedUserController)
userRoutes.get(
	'/:id',
	authTokenMiddleware,
	authAdmMiddleware,
	retrieveUserController
)
userRoutes.delete(
	'/:id',
	authTokenMiddleware,
	authAdmMiddleware,
	deleteUserController
)
userRoutes.patch(
	'/:id',
	authTokenMiddleware,
	authAdmMiddleware,
	updateUserController
)

export { userRoutes, loginRoute }
