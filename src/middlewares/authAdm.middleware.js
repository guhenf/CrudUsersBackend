import usersDatabase from '../database'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authAdmMiddleware = (req, res, next) => {
	const token = req.headers?.authorization?.split(' ')[1]
	const decoded = jwt.verify(token, process.env.SECRET_KEY)
	const user = usersDatabase.find((user) => user.id === decoded.id)

	if (!user.isAdm && user.id !== req.params.id) {
		return res.status(401).json({
			message: 'Unauthorized',
		})
	}
	next()
}

export default authAdmMiddleware
