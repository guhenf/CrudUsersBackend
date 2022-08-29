import express from 'express'
import { userRoutes, loginRoute } from './routes/user.Routes'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoute)

const port = 3000

app.listen(port, () => {
	console.log(`CRUD de usuarios rodando localmente na porta ${port}`)
})

export default app
