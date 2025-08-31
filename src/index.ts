import express, {Request, Response} from 'express'

import api from './api'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Node.js + Typescript API`)
})

app.use('/api/v0', api)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

