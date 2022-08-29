import updateUserService, {
	createUserService,
	deleteUserService,
	listUsersService,
	loggedUserService,
	loginUserService,
} from '../services/user.service'
import usersDatabase from '../database'
import jwt from 'jsonwebtoken'
import removeKeys from '../utils/removeKeysUtils'

export const createUserController = async (req, res) => {
	const user = req.body

	if (usersDatabase.find((elem) => user.email.toLowerCase() === elem.email)) {
		return res.status(400).json({
			message: 'Email address already exists!',
		})
	}

	const newUser = await createUserService(user)

	return res.status(201).json(newUser)
}

export const listUsersController = async (req, res) => {
	const users = await listUsersService()
	return res.json(users)
}

export const loginUserController = async (req, res) => {
	const { email, password } = req.body
	const login = await loginUserService(email, password)
	if (!login) {
		return res.status(401).json({ message: 'Email or password invalids' })
	}
	return res.json(login)
}

export const retrieveUserController = (req, res) => {
	const { id } = req.params
	const user = usersDatabase.find((user) => user.id === id)

	if (user) {
		return res.status(200).json(user)
	}
	return res.status(404).json({ message: 'User not found' })
}

export const loggedUserController = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]

	const decoded = jwt.verify(token, process.env.SECRET_KEY)

	let user = await loggedUserService(decoded.id)

	user = removeKeys(user, ['password'])

	return res.status(200).json(user)
}

export const deleteUserController = async (req, res) => {
	const { id } = req.params
	const { name } = req.body
	await deleteUserService(id)
	return res.status(200).json({ message: `User ${name} deleted with sucess` })
}

export const updateUserController = async (req, res) => {
	const { id } = req.params
	const { name, email, password } = req.body
	const updatedUser = await updateUserService(id, name, email, password)
	return res.status(200).json(updatedUser)
}
