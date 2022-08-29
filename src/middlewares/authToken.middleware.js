import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authTokenMiddleware = (req, res, next) => {
	let token = req.headers?.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({
			message: 'Missing authorization',
		})
	}

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			return res.status(401).json({ message: 'Invalid token' })
		}
		next()
	})
}

export default authTokenMiddleware
