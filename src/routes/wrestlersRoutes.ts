import {Router, Request, Response} from 'express'

import {wrestlers} from '../data'

const router = Router()

// Get all wrestlers
router.get('/', (req: Request, res: Response) => {
  res.json(wrestlers)
})

export default router