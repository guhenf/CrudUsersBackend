import express from 'express'

const app = express()
app.use(express.json())

const port = 3000

app.listen(port, () => {
	console.log(`CRUD de usuarios rodando localmente na porta ${port}`)
})

export default app
