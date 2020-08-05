import express from 'express'
import routes from './routes'
import cors from 'cors'
const log = console.log
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
	log('Server listening at http://localhost:3333')
})
