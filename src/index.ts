import express, {Request, Response} from 'express'

import api from './api'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

const result: any[] = []

app.get("/", (req: Request, res: Response) => {
  res.json(result)
})

app.use('/api/v0', api)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

