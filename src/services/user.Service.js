import usersDatabase from '../database'
import { compare, hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import removeKeysUtil from '../utils/removeKeysUtils'

export const createUserService = async (userData) => {
	const hashPassword = await hash(userData.password, 10)
	const createdOn = new Date()

	const newUser = {
		...userData,
		id: uuidv4(),
		password: hashPassword,
		createdOn: createdOn,
		updatedOn: createdOn,
	}

	usersDatabase.push(newUser)

	const user = removeKeysUtil(newUser, ['password'])

	return user
}

export const listUsersService = async () => {
	return usersDatabase
}

export const loginUserService = async (email, password) => {
	const user = usersDatabase.find((user) => user.email === email)

	if (user) {
		const passwordVerify = await compare(password, user.password)

		if (passwordVerify) {
			const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
				expiresIn: '24h',
			})
			return {
				token: token,
			}
		}
	}
}

export const loggedUserService = async (id) => {
	const user = usersDatabase.find((user) => user.id === id)
	return user
}

export const deleteUserService = async (id) => {
	const userIndex = usersDatabase.findIndex((user) => user.id === id)
	return usersDatabase.splice(userIndex, 1)
}

export const updateUserService = async (id, name, email, password) => {
	const user = usersDatabase.find((user) => user.id === id)

	const newName = name ? name : user?.name
	const newEmail = email ? email : user?.email
	const newHashPassword = password ? await hash(password, 10) : user?.password
	const updatedOn = new Date()

	const updatedUser = {
		name: newName,
		email: newEmail,
		password: newHashPassword,
		updatedOn,
	}

	const userIndex = usersDatabase.findIndex((user) => user.id === id)
	usersDatabase[userIndex] = { ...usersDatabase[userIndex], ...updatedUser }

	let returnUser
	returnUser = {
		name: usersDatabase[userIndex].name,
		email: usersDatabase[userIndex].email,
		id: usersDatabase[userIndex].id,
		isAdm: usersDatabase[userIndex].isAdm,
		updatedOn: updatedOn,
		createdOn: usersDatabase[userIndex].createdOn,
	}

	return returnUser
}

export default updateUserService
